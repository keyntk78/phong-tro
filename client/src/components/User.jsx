import React from 'react'
import { useSelector } from 'react-redux'
import avatar from '../assets/images/avatar.png'
const User = () => {
  const { currentData } = useSelector((state) => state.user)
  return (
    <div className='flex gap-2 pr-2'>
      <img
        src={currentData?.avatar ? currentData?.avatar : avatar}
        alt='avatar'
        className='h-[50px] w-[50px] rounded-full'
      />
      <div className='flex flex-col'>
        <span className='text-[14px]'>
          Xin chào,
          <span className='text-[16px] font-semibold'> {currentData?.name ? currentData?.name : '...'}</span>
        </span>
        <span className='text-[14px]'>{`Std: ${currentData.phone ? currentData.phone : '...'}`}</span>
      </div>
    </div>
  )
}

export default User
