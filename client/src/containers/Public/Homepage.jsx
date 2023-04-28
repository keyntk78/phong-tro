import React from 'react'
import { text } from '../../ultils/constant'
import { Province, ItemSidebar, RelatePost } from '../../components/index'
import { List } from './index'
import { useSelector } from 'react-redux'

const Homepage = () => {
  const { categories, prices, areas } = useSelector((state) => state.app)

  return (
    <div className='flex w-full flex-col gap-3'>
      <div>
        <h1 className='text-[28px] font-bold'>{text.HOME_TITLE}</h1>
        <p className='text-sm text-gray-600'>{text.HOME_DESCRIPTION}</p>
      </div>
      <Province />
      <div className='grid grid-cols-12 gap-4'>
        <List />
        <div className='col-span-4 flex flex-col gap-4'>
          <ItemSidebar content={categories} title={'Danh sách cho thuê'} />
          <ItemSidebar type={'priceCode'} content={prices} title={'Xem theo giá'} isCol2 />
          <ItemSidebar type={'areaCode'} content={areas} title={'Xem theo diện tích'} isCol2 />
          <RelatePost />
        </div>
      </div>
    </div>
  )
}

export default Homepage
