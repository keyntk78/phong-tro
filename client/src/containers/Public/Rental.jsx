import React, { useEffect, useState } from 'react'
import { Province, ItemSidebar, RelatePost } from '../../components/index'
import { List, Pagination } from './index'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const Rental = () => {
  const { prices, areas, categories } = useSelector((state) => state.app)
  const [categoryCode, setCategoryCode] = useState()
  const location = useLocation()
  const [categoryCurrent, setCategoryCurrent] = useState({})

  useEffect(() => {
    const category = categories?.find((item) => `/${item.slug}` === location.pathname)
    if (category) {
      setCategoryCode(category.code)
      setCategoryCurrent(category)
    }
  }, [location])

  return (
    <div className='flex w-full flex-col gap-3'>
      <div>
        <h1 className='text-[28px] font-bold'>{categoryCurrent?.header}</h1>
        <p className='text-sm text-gray-600'>{categoryCurrent?.subheader}</p>
      </div>
      <Province />
      <div className='grid grid-cols-12 gap-4'>
        <List categoryCode={categoryCode} />
        <div className='col-span-4 flex flex-col gap-4'>
          <ItemSidebar type={'priceCode'} content={prices} title={'Xem theo giá'} isCol2 />
          <ItemSidebar type={'areaCode'} content={areas} title={'Xem theo diện tích'} isCol2 />
          <RelatePost />
        </div>
      </div>
    </div>
  )
}

export default Rental
