import React, { memo } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'

const notActive =
  'flex flex items-center justify-center  rounded-md bg-white w-[46px] h-[48px] shadow-md hover:bg-gray-200'
const active =
  'flex items-center justify-center cursor-pointer rounded-md bg-[#E13427] text-white w-[46px] h-[48px] shadow-md'

const PaginationItem = ({ number, currentPage, setCurrentPage, icon }) => {
  const navigate = useNavigate()
  const hanldeChangPage = () => {
    if (+number) {
      setCurrentPage(+number)
      navigate({
        pathname: '',
        search: createSearchParams({
          page: number
        }).toString()
      })
    }
  }

  return (
    <div
      className={+number === +currentPage ? active : `${notActive} ${+number ? 'cursor-pointer' : ''}`}
      onClick={hanldeChangPage}
    >
      {icon || number}
    </div>
  )
}

export default memo(PaginationItem)
