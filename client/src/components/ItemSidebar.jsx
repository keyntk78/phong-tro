import React, { memo } from 'react'
import icons from '../ultils/incons'
import { Link } from 'react-router-dom'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'

const { AiOutlineRight } = icons

const ItemSidebar = ({ content, title, isCol2, type }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleFilterPost = (code) => {
    // dispatch(actions.getPaginationPosts({ [type]: code }))
    navigate({
      pathname: location.pathname,
      search: createSearchParams({
        [type]: code
      }).toString()
    })
  }

  return (
    <div className='rounded-md bg-white px-4  py-4 shadow-md'>
      <h3 className='mb-2 text-xl font-semibold'>{title}</h3>
      <div className='grid grid-cols-2 gap-2'>
        {content?.length > 0 &&
          content.map((item) => {
            return !isCol2 ? (
              <div key={item.code} className='col-span-2  flex items-center gap-2 border-b py-3 text-[15px]'>
                <AiOutlineRight size={14} />
                <Link to={item.slug ? item.slug : '/'} className='font-normal hover:text-[#f60]'>
                  {item.value}
                </Link>
              </div>
            ) : (
              <div
                key={item.code}
                onClick={() => handleFilterPost(item.code)}
                className='col-span-1 flex cursor-pointer items-center gap-2 border-b py-3 text-[15px]'
              >
                <AiOutlineRight size={14} />
                <div className='font-normal hover:text-[#f60]'>{item.value}</div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default memo(ItemSidebar)
