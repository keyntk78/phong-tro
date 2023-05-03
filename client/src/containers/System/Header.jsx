import React from 'react'
import { Navigation } from '../Public'
import logo from '../../assets/images/logo_white.png'

const Header = () => {
  return (
    <div className=' grid w-full grid-cols-12 bg-secondary1 text-white'>
      <div className='col-span-2 flex items-center justify-center '>
        <img src={logo} alt='logo' className='h-[60px] w-[150px] cursor-pointer object-contain' />
      </div>
      <div className='col-span-10 flex items-center  justify-start text-sm font-medium'>
        <Navigation />
      </div>
    </div>
  )
}

export default Header
