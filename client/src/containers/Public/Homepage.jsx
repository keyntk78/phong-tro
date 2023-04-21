import React from 'react'
import { text } from '../../ultils/constant'
import { Province, ItemSidebar } from '../../components/index'
import { List, Pagination } from './index'
import { useSearchParams } from 'react-router-dom'

const Homepage = () => {
  let [searchParams] = useSearchParams()
  return (
    <div className='flex w-full flex-col gap-3'>
      <div>
        <h1 className='text-[28px] font-bold'>{text.HOME_TITLE}</h1>
        <p className='text-sm text-gray-600'>{text.HOME_DESCRIPTION}</p>
      </div>
      <Province />
      <div className='grid grid-cols-12 gap-4'>
        <List page={searchParams.get('page')} />
        <div className='col-span-4 flex flex-col gap-4'>
          <ItemSidebar />
          <ItemSidebar />
          <ItemSidebar />
        </div>
      </div>
      <div className='mt-4 grid grid-cols-12 gap-4'>
        <div className='col-span-8 flex items-center justify-center'>
          <Pagination page={searchParams.get('page')} />
        </div>
      </div>
    </div>
  )
}

export default Homepage
