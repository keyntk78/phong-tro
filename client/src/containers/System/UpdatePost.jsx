import React, { useEffect, useState } from 'react'
import { AddressForm, OverviewForm, Loading, Button } from '../../components'
import icons from '../../ultils/incons'
import { apiUploadImage, apiUpdatePost } from '../../services'
import { getCodes } from '../../ultils/common/getCodes'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import validate from '../../ultils/common/validateField'
import * as actions from '../../store/actions'

const { BsFillCameraFill, AiFillDelete } = icons

const UpdatePost = ({ setIsEdit }) => {
  const { dataEdit } = useSelector((state) => state.posts)
  const dispatch = useDispatch()
  const [payload, setPayload] = useState(() => {
    const initData = {
      categoryCode: dataEdit?.categoryCode || '',
      title: dataEdit?.title || '',
      priceNumber: dataEdit?.attribute?.priceNumber || 0,
      areaNumber: dataEdit?.attribute?.areaNumber || 0,
      images: JSON.parse(dataEdit?.images.image) || '',
      address: dataEdit?.address || '',
      description: dataEdit?.description || [],
      target: dataEdit?.overview?.target || '',
      province: '',
      district: ''
    }

    return initData
  })

  const [imagePreview, setImaggePreview] = useState([])
  const { prices, areas, categories } = useSelector((state) => state.app)
  const { currentData } = useSelector((state) => state.user)
  const [invalidFields, setInvaidFields] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleFile = async (e) => {
    e.stopPropagation()
    setIsLoading(true)
    let images = []
    let files = e.target.files
    let formData = new FormData()

    for (let i of files) {
      formData.append('file', i)
      formData.append('upload_preset', process.env.REACT_APP_UPLOAD_ASSETS_NAME)

      const reponse = await apiUploadImage(formData)
      if (reponse.status === 200) {
        images = [...images, reponse.data?.secure_url]
      }
    }
    setIsLoading(false)
    setImaggePreview((prev) => [...prev, ...images])
    setPayload((prev) => ({ ...prev, images: [...prev.images, ...images] }))
  }

  const handleDeleteImage = (image) => {
    setImaggePreview((prev) => prev?.filter((item) => item !== image))
    setPayload((prev) => ({ ...prev, images: prev.images?.filter((item) => item !== image) }))
  }

  const handleSubmit = async () => {
    let priceCodeArr = getCodes(payload.priceNumber / 1000000, prices)
    let areaCodeArr = getCodes(payload.areaNumber, areas)
    let priceCode = priceCodeArr[0]?.code
    let areaCode = areaCodeArr[0]?.code

    let finalPayLoad = {
      ...payload,
      postId: dataEdit.id,
      attributeId: dataEdit?.attributesId,
      overviewId: dataEdit?.overviewId,
      imageId: dataEdit?.imagesId,
      priceCode,
      areaCode,
      userId: currentData.id,
      label: `${categories > 0 ? categories?.find((item) => item.code === payload?.categoryCode).value : ''} ${
        payload.district ? payload.district : ''
      }`,
      areaOverview: `${categories > 0 ? categories?.find((item) => item.code === payload?.categoryCode).value : ''} ${
        payload.province ? payload.province : ''
      }`
    }

    const result = validate(finalPayLoad, setInvaidFields)

    if (result === 0) {
      const respone = await apiUpdatePost(finalPayLoad)
      if (respone?.data.err === 0) {
        await Swal.fire('Thành công!', 'Đã chỉnh sửa bài đăng!', 'success').then(() => {
          setIsEdit(false)
          setPayload({
            categoryCode: '',
            title: '',
            priceNumber: 0,
            areaNumber: 0,
            images: '',
            address: '',
            priceCode: '',
            areaCode: '',
            description: '',
            target: '',
            province: '',
            userId: '',
            lable: '',
            district: '',
            areaOverview: '',
            category: ''
          })
          dispatch(actions.resetEditData())
        })
      } else {
        Swal.fire('Opps!', 'Thêm thất bại!', 'error')
      }
    }
  }

  useEffect(() => {
    if (dataEdit) {
      let images = JSON.parse(dataEdit?.images?.image)
      images && setImaggePreview(images)
    }
  }, [dataEdit])

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        setIsEdit(false)
        dispatch(actions.resetEditData())
      }}
      className='absolute bottom-0 left-0 right-0 top-0 flex justify-center bg-overlay-70'
    >
      <div className='w-full max-w-[1100px] overflow-y-auto bg-white' onClick={(e) => e.stopPropagation()}>
        <div className='col-span-10 w-full  overflow-y-scroll bg-white px-8 py-4 shadow-md'>
          <h1 className='border-b py-4 text-3xl font-medium'>Chỉnh sửa bài đăng</h1>
          <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-12 flex flex-col gap-8 py-4'>
              <AddressForm invalidFields={invalidFields} setInvaidFields={setInvaidFields} setPayload={setPayload} />
              <OverviewForm
                invalidFields={invalidFields}
                setInvaidFields={setInvaidFields}
                setPayload={setPayload}
                payload={payload}
              />
              <div className='mb-4 flex w-full flex-col gap-4'>
                <h2 className='py-4 text-xl font-semibold'>Hình ảnh</h2>
                <small>Cập nhật hình ảnh rõ ràng cho thuê nhanh hơn</small>
                <div className='w-full'>
                  <label
                    htmlFor='file'
                    className='flex h-[200px] w-full flex-col items-center justify-center border-2 border-dashed border-gray-400 text-[28px] text-blue-800'
                  >
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <div className='flex flex-col items-center justify-center'>
                        <BsFillCameraFill size={40} color='blue' />
                        Thêm ảnh
                      </div>
                    )}
                  </label>
                  <input
                    hidden
                    onChange={handleFile}
                    onFocus={() => setInvaidFields([])}
                    type='file'
                    id='file'
                    multiple
                  />
                  <small className='text-red-500'>
                    {invalidFields?.some((item) => item.name === 'images') &&
                      invalidFields?.find((item) => item.name === 'images').message}
                  </small>
                  <div className='mt-4 flex flex-col gap-4'>
                    <h3 className='font-medium'>Xem trước</h3>
                    <div className='flex flex-wrap items-center gap-3'>
                      {imagePreview?.map((item, index) => {
                        return (
                          <div key={index} className='relative'>
                            <img src={item} alt='preview' className='h-[150px] w-[150px] rounded-md object-cover' />
                            <span
                              onClick={() => handleDeleteImage(item)}
                              title='Xóa'
                              className='absolute right-1 top-1 cursor-pointer rounded-full bg-gray-300 p-1 text-white hover:bg-slate-400'
                            >
                              <AiFillDelete size={20} />
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <Button text='Chỉnh sửa' textColor='text-white' bgColor='bg-secondary1' onClick={handleSubmit} />
            </div>
          </div>
          <div className='h-[100px]'></div>
        </div>
      </div>
    </div>
  )
}

export default UpdatePost
