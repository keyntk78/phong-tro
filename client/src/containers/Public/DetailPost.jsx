import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { RelatePost, SliderSlick } from '../../components'
import { Link } from 'react-router-dom'
import icons from '../../ultils/incons'
import { convertPrice } from './../../ultils/common/convertPrice'
import moment from 'moment'
import 'moment/locale/vi'

const { ImLocation2, TbReportMoney, FaCropAlt, BiTime, BiHash } = icons

const DetailPost = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const { postDetail } = useSelector((state) => state.posts)

  useEffect(() => {
    params.postId && dispatch(actions.getDetailPost(params.postId))
  }, [params.postId])

  return (
    <div className='flex w-full flex-col gap-3'>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-8 flex flex-col gap-8 rounded-md bg-white shadow-md'>
          <SliderSlick images={postDetail && postDetail.length > 0 && JSON.parse(postDetail[0]?.images.image)} />
          <div className='flex flex-col gap-2 px-6'>
            <h2 className='text-2xl font-bold text-[#e13427]'>{postDetail[0]?.title}</h2>
            <p className='text-[16px] font-medium'>
              Chuyên mục:{' '}
              <Link
                className='font-medium text-blue-600 underline hover:text-orange-500'
                to={`/${postDetail[0]?.category.slug}`}
              >
                {postDetail[0]?.category.value}
              </Link>
            </p>
            <p className='flex items-center gap-1 text-[16px]'>
              <ImLocation2 color='blue' size={20} />
              Địa chỉ: {postDetail[0]?.address}
            </p>
            <div className='flex items-center gap-6'>
              <span className='flex items-center gap-1 text-[22px] font-semibold text-red-400'>
                <TbReportMoney />
                {convertPrice(+postDetail[0]?.attribute.priceNumber)}
              </span>
              <span className='flex items-center gap-2 text-[16px]'>
                <FaCropAlt color='gray' size={18} />
                {+postDetail[0]?.attribute.areaNumber} m2
              </span>
              <span className='flex items-center gap-2 text-[16px]'>
                <BiTime color='gray' size={20} />
                {moment(postDetail[0]?.updatedAt).fromNow()}
              </span>
              <span className='flex items-center gap-2 text-[16px]'>
                <BiHash color='gray' size={20} />
                {postDetail[0]?.overview.code}
              </span>
            </div>
          </div>
          <div className='flex flex-col gap-4 px-6'>
            <h3 className='text-xl font-semibold'>Thông tin mô tả</h3>
            <p className='text-justify text-[16px]'>{postDetail[0]?.description}</p>
          </div>
          <div className='flex flex-col gap-4 px-6'>
            <h3 className='text-xl font-semibold'>Đặt điểm tin đăng</h3>
            <table>
              <tbody>
                <tr className=''>
                  <td className='w-1/3 p-2'>Mã tin:</td>
                  <td>{postDetail[0]?.overview.code}</td>
                </tr>
                <tr className='bg-[#f5f5f5]'>
                  <td className='w-1/3 p-2'>Khu vực:</td>
                  <td>{postDetail[0]?.province.value}</td>
                </tr>
                <tr className=''>
                  <td className='w-1/3 p-2'>Gói tin:</td>
                  <td>{postDetail[0]?.overview.bonus}</td>
                </tr>
                <tr className='bg-[#f5f5f5]'>
                  <t className='w-1/3 p-2'>Đối tượng thuê:</t>
                  <td>{postDetail[0]?.overview.target}</td>
                </tr>
                <tr className=''>
                  <td className='w-1/3 p-2'>Ngày đăng:</td>
                  <td>{moment(postDetail[0]?.overview.created).format('llll')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className='flex flex-col gap-4 px-6'>
            <h3 className='text-xl font-semibold'>Thông tin liên hệ</h3>
            <table>
              <tbody>
                <tr className=''>
                  <td className='w-1/3 p-2'>Liên hệ:</td>
                  <td>{postDetail[0]?.user.name}</td>
                </tr>
                <tr className='bg-[#f5f5f5]'>
                  <td className='w-1/3 p-2'>Điện thoại:</td>
                  <td>{postDetail[0]?.user.phone}</td>
                </tr>
                <tr className=''>
                  <td className='w-1/3 p-2'>Zalo:</td>
                  <td>{postDetail[0]?.user.zalo}</td>
                </tr>
                {/* <tr className='bg-[#f5f5f5]'>
                  <t className='w-1/3 p-2'>Facebook:</t>
                  <td>{postDetail[0]?.overview.target}</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
        <div className='col-span-4 flex flex-col gap-2'>
          <RelatePost />
        </div>
      </div>
    </div>
  )
}

export default DetailPost
