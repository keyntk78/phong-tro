import React, { memo, useState } from 'react'
import icons from '../ultils/incons'
import avatar from '../assets/images/avatar.png'
import { Link } from 'react-router-dom'
import { formatVietnameseToString } from '../ultils/common/formatVietnameseToString'

const { GrStar, BsFillBookmarkStarFill, AiOutlineHeart, AiFillHeart } = icons

const Item = ({ images, title, price, acreage, address, description, name, zalo, phone, star, id }) => {
  const [isHoverHeart, setIsHoverHeart] = useState(false)
  let slug = formatVietnameseToString(title).split('/').join('-')
  let coutStar = []
  for (let i = 0; i < star; i++) {
    if (star !== 0) {
      coutStar.push(<GrStar size={20} key={i} className='inline-block pb-1 text-yellow-500' />)
    }
  }

  return (
    <div className=''>
      <div className='grid  grid-cols-12 gap-2 border-t border-purple-500 py-3'>
        <Link to={`/chi-tiet/${slug}/${id}`} className='relative col-span-5 cursor-pointer'>
          <img src={images[1]} alt='priview' className='col-span-1 h-[270px] w-full object-cover' />
          <span className='absolute bottom-2 left-2 rounded-md bg-gray-900 px-1 text-sm text-white opacity-70'>
            {`${images.length} ảnh`}
          </span>
          <span
            className='absolute bottom-2 right-2 '
            onMouseEnter={() => setIsHoverHeart(true)}
            onMouseLeave={() => setIsHoverHeart(false)}
          >
            {isHoverHeart ? (
              <AiFillHeart size={24} className='text-red-400' />
            ) : (
              <AiOutlineHeart size={24} color='white' />
            )}
          </span>
        </Link>
        <div className='col-span-7 pl-1'>
          <div className='flex items-center justify-between'>
            <div className='ml-1 text-[15px] font-medium uppercase text-red-600'>
              {coutStar.map((item) => {
                return item
              })}
              <Link to={`/chi-tiet/${slug}/${id}`} className='hover:underline'>
                {title}
              </Link>
            </div>
            <div>
              <BsFillBookmarkStarFill size={25} className=' text-yellow-500' />
            </div>
          </div>
          <div className='flex flex-wrap items-center justify-between pt-2'>
            <span className='text-[15px] font-bold text-green-600'>{price}</span>
            <span className='text-[15px]'>{acreage}</span>
            <span className='text-[15px]'>{`${address.split(',')[address.split(',').length - 2]}, ${
              address.split(',')[address.split(',').length - 1]
            } `}</span>
          </div>
          <p className='h-[80px] w-full overflow-hidden text-ellipsis  pt-2 text-[15px] text-gray-400'>{description}</p>
          <div className='flex flex-wrap items-center justify-between gap-2 pt-3'>
            <div className='flex items-center gap-1'>
              <img src={avatar} alt='avatar' className='h-[30px] w-[30px] rounded-full ' /> {name}
            </div>
            <div className='flex items-center gap-1'>
              <button
                type='button'
                className='rounded-md border border-blue-500 bg-white px-2 text-[15px] font-medium text-blue-500'
                title={zalo}
              >
                Nhắn zalo
              </button>
              <button className='rounded-md border bg-blue-500 px-2 text-[15px] font-medium text-white'>
                Gọi {phone}
              </button>
            </div>
            <div className='flex gap-2'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Item)
