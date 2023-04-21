import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { apiGetCategories } from '../../services/category'
import { formatVietnameseToString } from '../../ultils/common/formatVietnameseToString'

const Navigation = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      const reponese = await apiGetCategories()
      if (reponese?.data.err === 0) {
        setCategories(reponese.data.response)
      }
    }
    fetchCategories()
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
                  to={`${formatVietnameseToString(item.value)}`}
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
