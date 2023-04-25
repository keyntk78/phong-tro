import React, { useCallback, useEffect, useRef } from 'react'
import logo from '../../assets/images/logo_thuenha.png'
import { Button } from '../../components'
import icons from '../../ultils/incons'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { path } from '../../ultils/constant'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'

const { AiOutlinePlusCircle } = icons

const Header = () => {
  const navigate = useNavigate()
  const { isLoggedIn } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } })
  }, [])
  const listRef = useRef()
  const [searchParam] = useSearchParams()

  useEffect(() => {
    listRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [searchParam.get('page')])

  return (
    <div ref={listRef} className='m-auto flex w-1100 items-center justify-between py-2'>
      <Link to='/'>
        <img src={logo} alt='logo' className='h-[70px] w-[240px] object-contain' />
      </Link>
      <div className='flex items-center gap-2'>
        {!isLoggedIn && (
          <>
            <span className='text-[14px]'>ThueNha.com xin chào!</span>
            <Button text='Đăng nhập' textColor='text-white' bgColor='bg-secondary1' onClick={() => goLogin(false)} />
            <Button text='Đăng ký' textColor='text-white' bgColor='bg-secondary1' onClick={() => goLogin(true)} />
          </>
        )}

        {isLoggedIn && (
          <>
            <span className='text-[14px]'>Tên!</span>
            <Button
              text='Đăng xuất'
              textColor='text-white'
              bgColor='bg-red-700'
              onClick={() => dispatch(actions.logout)}
            />
          </>
        )}

        <Button text='Đăng tin mới' textColor='text-white' bgColor='bg-secondary2' IsIcon={AiOutlinePlusCircle} />
      </div>
    </div>
  )
}

export default Header
