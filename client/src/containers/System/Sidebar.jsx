import React from 'react'
import avatar from '../../assets/images/avatar.png'
import { useDispatch, useSelector } from 'react-redux'
import menuSidebar from '../../ultils/menuSidebar'
import { NavLink } from 'react-router-dom'
import icons from '../../ultils/incons'
import * as actions from '../../store/actions'

const { AiOutlineLogin } = icons

const activeStyle = 'flex items-center rounded-md gap-1 border-b bg-gray-200 px-1  py-2 text-orange-500 font-bold '
const notActiveStyle =
  'flex items-center gap-1 rounded-md px-1 border-b py-2 text-blue-500 hover:bg-gray-200 hover:text-orange-500'

const Sidebar = () => {
  const dispatch = useDispatch()

  const { currentData } = useSelector((state) => state.user)
  return (
    <div className='col-span-2 min-h-screen bg-primary p-4'>
      <div className='flex gap-2'>
        <img
          src={currentData?.avatar ? currentData?.avatar : avatar}
          alt='avatar'
          className='h-[50px] w-[50px] rounded-full'
        />
        <div className='flex flex-col'>
          <span className='font-semibold '>{currentData?.name}</span>
          <span className='text-[14px]'>Sđt: {currentData?.phone}</span>
        </div>
      </div>
      <div className='mt-5'>
        {menuSidebar.map((item) => {
          return (
            <NavLink
              className={({ isActive }) => (isActive ? activeStyle : notActiveStyle)}
              key={item.id}
              to={item?.path}
            >
              {item?.icon}
              {item.text}
            </NavLink>
          )
        })}
        <span
          className='flex cursor-pointer items-center gap-1 rounded-md border-b px-1 py-2 text-blue-500 hover:bg-gray-200 hover:text-orange-500'
          onClick={() => {
            dispatch(actions.logout)
          }}
        >
          <AiOutlineLogin />
          Thoát
        </span>
      </div>
    </div>
  )
}

export default Sidebar
