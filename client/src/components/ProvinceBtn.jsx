import React, { memo } from 'react'

const ProvinceBtn = ({ name, image }) => {
  return (
    <div className='cursor-pointer rounded-md text-blue-700 shadow-lg hover:text-[#f60]'>
      <img src={image} alt={name} className='h-[110px] w-[190px] rounded-t-lg object-cover' />
      <div className='p-2 text-center font-medium '>{name}</div>
    </div>
  )
}

export default memo(ProvinceBtn)
