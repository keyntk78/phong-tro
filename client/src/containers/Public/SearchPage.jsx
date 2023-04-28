import React from 'react'
import { ItemSidebar, RelatePost } from '../../components/index'
import { List, Pagination } from './index'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const SearchPage = () => {
  const { prices, areas } = useSelector((state) => state.app)
  const location = useLocation()

  return (
    <div className='flex w-full flex-col gap-3'>
      <div>
        <h1 className='text-[28px] font-bold'>{location.state?.titleSearch || 'kết quả tìm kiếm'}</h1>
        <p className='text-sm text-gray-600'>
          {location.state?.titleSearch + ':' || 'Tìm tất cả'} giá rẻ, chính chủ, đầy đủ tiện nghi. Cho thuê chung cư với
          nhiều mức giá, diện tích cho thuê khác nhau.
        </p>
      </div>
      <div className='grid grid-cols-12 gap-4'>
        <List />
        <div className='col-span-4 flex flex-col gap-4'>
          <ItemSidebar type={'priceCode'} content={prices} title={'Xem theo giá'} isCol2 />
          <ItemSidebar type={'areaCode'} content={areas} title={'Xem theo diện tích'} isCol2 />
          <RelatePost />
        </div>
      </div>
    </div>
  )
}

export default SearchPage
