import React, { useCallback } from 'react'
import logo from '../../assets/images/logo1.png'
import { Button } from '../../components'
import icons from '../../ultils/incons'
import { useNavigate } from 'react-router-dom'
import { path } from '../../ultils/constant'
import { Link } from 'react-router-dom'

const { AiOutlinePlusCircle } = icons

const Header = () => {
  const navigate = useNavigate()
  const goLogin = useCallback(() => {
    navigate(path.LOGIN)
  }, [])
  return (
    <div className='m-auto flex w-1100 items-center justify-between'>
      <Link to='/'>
        <img src={logo} alt='logo' className='h-[70px] w-[240px] object-contain' />
      </Link>
      <div className='flex items-center gap-2'>
        <span className='text-[14px]'>Phongtro123.com xin chào!</span>
        <Button text='Đăng nhập' textColor='text-white' bgColor='bg-secondary1' onClick={goLogin} />
        <Button text='Đăng ký' textColor='text-white' bgColor='bg-secondary1' onClick={goLogin} />
        <Button text='Đăng tin mới' textColor='text-white' bgColor='bg-secondary2' IsIcon={AiOutlinePlusCircle} />
      </div>
    </div>
  )
}

export default Header
