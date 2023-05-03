import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import * as action from '../../store/actions'

const Navigation = () => {
  const dispatch = useDispatch()
  const { categories } = useSelector((state) => state.app)

  useEffect(() => {
    dispatch(action.getCategories())
  }, [])

  return (
    <div className='flex  w-full items-center justify-center bg-secondary1 text-white'>
      <div className='flex w-1100 items-center  text-sm font-medium '>
        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive ? `bg-secondary2 px-4 py-3 hover:bg-secondary2` : `px-4 py-3 hover:bg-secondary2`
          }
        >
          Trang chủ
        </NavLink>
        {categories?.length > 0 &&
          categories.map((item) => {
            return (
              <div key={item.code} className='flex h-full items-center justify-center'>
                <NavLink
                  to={`/${item.slug}`}
                  className={({ isActive }) =>
                    isActive ? `bg-secondary2 px-4 py-3 hover:bg-secondary2` : `px-4 py-3 hover:bg-secondary2`
                  }
                >
                  {item.value}
                </NavLink>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Navigation
