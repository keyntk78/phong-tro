import React from 'react'
import { Link } from 'react-router-dom'
import { convertPrice } from '../ultils/common/convertPrice'
import moment from 'moment'
import 'moment/locale/vi'

const ItemSmall = ({ title, price, image, slug, id, createdAt }) => {
  const formatTime = (createdAt) => {
    return moment(createdAt).fromNow()
  }

  return (
    <Link to={`/chi-tiet/${slug}/${id}`} className='grid grid-cols-3 content-center gap-2 border-b py-3'>
      <img src={image[1]} alt='anh' className='col-span-1 h-[90px] w-full rounded-md object-cover' />
      <div className='col-span-2 flex flex-col justify-between'>
        <h5 className='text-ellipsi h-[50px] overflow-hidden text-[15px] font-medium text-blue-700'>{title}</h5>
        <div className='flex items-center justify-between'>
          <span className='text-green-600'>{convertPrice(price)}</span>
          <span className='text-[12px] text-[#aaa]'>{formatTime(createdAt)}</span>
        </div>
      </div>
    </Link>
  )
}

export default ItemSmall
