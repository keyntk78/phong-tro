import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { convertPrice } from '../../ultils/common/convertPrice'
import moment from 'moment'
import 'moment/locale/vi'
import { Button } from '../../components'

const ManagePost = () => {
  const dispatch = useDispatch()
  const { postOfCurrent } = useSelector((state) => state.posts)
  useEffect(() => {
    dispatch(actions.getPaginationAdminPosts())
  }, [])

  console.log(postOfCurrent)

  return (
    <div className='col-span-10 w-full  overflow-y-scroll bg-white px-8 py-4 shadow-md'>
      <h1 className='border-b py-4 text-3xl font-medium'>Quản lý tin đăng</h1>
      <div className='mt-6'>
        <table className='w-full'>
          <thead className='py-2'>
            <tr className='flex w-full'>
              <th className='flex-1 border p-2'>Mã tin</th>
              <th className='flex-1 border p-2'>Ảnh đại diện</th>
              <th className='flex-1 border p-2'>Tiêu đề</th>
              <th className='flex-1 border p-2'>Giá</th>
              <th className='flex-1 border p-2'>Ngày bắt đầu</th>
              <th className='flex-1 border p-2'>Ngày hết hạn</th>
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
                    <td className='flex flex-1 items-center border p-2'>
                      {moment(item?.overview.created).format('LLLL')}
                    </td>
                    <td className='flex flex-1 items-center border p-2'>
                      {moment(item?.overview.expired).format('LLLL')}
                    </td>
                    <td className='flex flex-1 items-center justify-center border p-2 text-center'>
                      {item?.overview.target}
                    </td>
                    <td className='flex flex-1 items-center justify-center gap-2 border p-2'>
                      <Button text={'Sửa'} bgColor={'bg-green-600'} textColor={'text-white'} />
                      <Button text={'Xóa'} bgColor={'bg-orange-600'} textColor={'text-white'} />
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
      <div className='h-[500px]'></div>
    </div>
  )
}

export default ManagePost
