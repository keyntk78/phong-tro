import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { convertPrice } from '../../ultils/common/convertPrice'
import moment from 'moment'
import 'moment/locale/vi'
import { Button } from '../../components'
import { UpdatePost } from './index'
import { apiDeletePost } from '../../services'
import Swal from 'sweetalert2'

const ManagePost = () => {
  const dispatch = useDispatch()
  const [isEdit, setIsEdit] = useState(false)
  const [reloadData, setReloadData] = useState(false)

  const { postOfCurrent, dataEdit } = useSelector((state) => state.posts)
  useEffect(() => {
    !dataEdit && dispatch(actions.getPaginationAdminPosts())
  }, [dataEdit, reloadData])

  const handleDeletePost = async (post) => {
    Swal.fire({
      title: 'Bạn có chắc muốn xóa?',
      text: 'Bạn không thể khôi phục lại được!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeletePost(post.id, post.attributesId, post.imagesId, post.overviewId)
        if (response?.data.err === 0) {
          setReloadData((prev) => !prev)
          Swal.fire('Đã xóa!', 'Bạn đã xóa bài đăng.', 'success')
        } else {
          console.log(response?.data.err)
          Swal.fire('Opps!', 'Xóa thất bại!', 'error')
        }
      }
    })
  }

  return (
    <div className='col-span-10  w-full overflow-y-scroll bg-white px-8 py-4 shadow-md'>
      <h1 className='border-b py-4 text-3xl font-medium'>Quản lý tin đăng</h1>
      <div className='mt-6'>
        <table className='w-full'>
          <thead className='py-2'>
            <tr className='flex w-full bg-blue-100'>
              <th className='flex-1 border p-2'>Mã tin</th>
              <th className='flex-1 border p-2'>Ảnh đại diện</th>
              <th className='flex-1 border p-2'>Tiêu đề</th>
              <th className='flex-1 border p-2'>Giá</th>
              <th className='flex-1 border p-2'>Diện tích</th>
              <th className='flex-1 border p-2'>Địa chỉ</th>
              <th className='flex-1 border p-2'>Đối tượng thuê</th>
              <th className='flex-1 border p-2'>Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {postOfCurrent <= 0 ? (
              <tr>
                <td className='p-2 text-center' colSpan={7}>
                  Bạn chưa có bài đăng nào
                </td>
              </tr>
            ) : (
              postOfCurrent?.map((item) => {
                return (
                  <tr key={item.id} className='flex w-full'>
                    <td className='flex  flex-1 items-center justify-center border p-2'>{item?.overview.code}</td>
                    <td className='flex flex-1 items-center justify-center border p-2'>
                      <img
                        src={JSON.parse(item?.images?.image)[0]}
                        alt='post'
                        className='h-20 w-10 rounded-md object-cover '
                      />
                    </td>
                    <td className='flex flex-1 items-center border p-2'>{item?.title} </td>
                    <td className='flex flex-1 items-center border p-2'>{convertPrice(item?.attribute.priceNumber)}</td>
                    <td className='flex flex-1 items-center  justify-center border p-2'>
                      {item?.attribute.areaNumber} m2
                    </td>
                    <td className='flex flex-1 items-center border p-2'>{item.address}</td>
                    <td className='flex flex-1 items-center justify-center border p-2 text-center'>
                      {item?.overview.target}
                    </td>
                    <td className='flex flex-1 items-center justify-center gap-2 border p-2'>
                      <Button
                        onClick={() => {
                          dispatch(actions.editData(item))
                          setIsEdit(true)
                        }}
                        text={'Sửa'}
                        bgColor={'bg-green-600'}
                        textColor={'text-white'}
                      />
                      <Button
                        onClick={() => {
                          handleDeletePost(item)
                        }}
                        text={'Xóa'}
                        bgColor={'bg-orange-600'}
                        textColor={'text-white'}
                      />
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
      <div className='h-[100px]'></div>
      {isEdit && <UpdatePost setIsEdit={setIsEdit} isEdit />}
    </div>
  )
}

export default ManagePost
