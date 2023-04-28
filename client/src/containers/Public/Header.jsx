import React, { useCallback, useEffect, useRef, useState } from 'react'
import logo from '../../assets/images/logo_thuenha.png'
import { Button, User } from '../../components'
import icons from '../../ultils/incons'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { path } from '../../ultils/constant'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import menuManage from '../../ultils/menuManage'

const { AiOutlinePlusCircle, AiOutlineDown, AiOutlineLogin } = icons

const Header = () => {
  const navigate = useNavigate()
  const { isLoggedIn } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } })
  }, [])
  const listRef = useRef()
  const [searchParam] = useSearchParams()
  const [isShowMenu, setIsShowMenu] = useState(false)

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
          <div className='relative flex items-center gap-1'>
            <User />
            <Button
              text='Quản lý tài khoản'
              textColor='text-white'
              bgColor='bg-secondary1'
              IsIcon={AiOutlineDown}
              onClick={() => setIsShowMenu((prev) => !prev)}
            />
            {isShowMenu && (
              <div className='absolute right-0 top-[45px] flex min-w-[200px] flex-col rounded-md bg-white p-4 shadow-md'>
                {menuManage.map((item) => {
                  return (
                    <Link
                      className='flex items-center gap-1 border-b py-2 text-blue-500 hover:text-orange-500'
                      key={item.id}
                      to={item?.path}
                    >
                      {item?.icon}
                      {item.text}
                    </Link>
                  )
                })}
                <span
                  className='flex cursor-pointer  items-center gap-1 border-b py-2 text-blue-500 hover:text-orange-500'
                  onClick={() => {
                    dispatch(actions.logout)
                    setIsShowMenu(false)
                  }}
                >
                  <AiOutlineLogin />
                  Đăng xuất
                </span>
              </div>
            )}
          </div>
        )}

        <Button text='Đăng tin mới' textColor='text-white' bgColor='bg-secondary2' IsIcon={AiOutlinePlusCircle} />
      </div>
    </div>
  )
}

export default Header
