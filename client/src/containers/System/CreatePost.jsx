import React, { useState } from 'react'
import { AddressForm, OverviewForm, Loading, Button } from '../../components'
import icons from '../../ultils/incons'
import { apiUploadImage, apiCreateNewPost } from '../../services'
import { getCodes } from '../../ultils/common/getCodes'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import validate from '../../ultils/common/validateField'

const { BsFillCameraFill, AiFillDelete } = icons

const CreatePost = () => {
  const [payload, setPayload] = useState({
    categoryCode: '',
    title: '',
    priceNumber: 0,
    areaNumber: 0,
    images: '',
    address: '',
    description: '',
    target: '',
    province: '',
    district: ''
  })

  const [imagePreview, setImaggePreview] = useState([])
  const { prices, areas, categories } = useSelector((state) => state.app)
  const { currentData } = useSelector((state) => state.user)
  const [invalidFields, setInvaidFields] = useState([])
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

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    let priceCodeArr = getCodes(payload.priceNumber / 1000000, prices)
    let areaCodeArr = getCodes(payload.areaNumber, areas)
    let priceCode = priceCodeArr[0]?.code
    let areaCode = areaCodeArr[0]?.code

    let finalPayLoad = {
      ...payload,
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
    console.log(invalidFields)
    console.log(result)

    if (result === 0) {
      const respone = await apiCreateNewPost(finalPayLoad)
      console.log(respone)
      if (respone?.data.err === 0) {
        await Swal.fire('Thành công!', 'Đã thêm bài đăng mới!', 'success').then(() => {
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
        })
      } else {
        Swal.fire('Opps!', 'Thêm thất bại!', 'error')
      }
    }
  }

  return (
    <div className='col-span-10 w-full  overflow-y-scroll bg-white px-8 py-4 shadow-md'>
      <h1 className='border-b py-4 text-3xl font-medium'>Đăng tin mới</h1>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-8 flex flex-col gap-8 py-4'>
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
              <input hidden onChange={handleFile} onFocus={() => setInvaidFields([])} type='file' id='file' multiple />
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
          <Button text='Tạo mới' textColor='text-white' bgColor='bg-secondary1' onClick={handleSubmit} />
        </div>
        <div className='col-span-4'>map</div>
      </div>
      <div className='h-[100px]'></div>
    </div>
  )
}

export default CreatePost
