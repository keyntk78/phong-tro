import React from 'react'
import { ProvinceBtn } from './index'
import { location } from '../ultils/constant'

const Province = () => {
  return (
    <div className='flex items-center justify-center gap-4 py-2'>
      {location.map((item, index) => {
        return <ProvinceBtn key={index} image={item.image} name={item.name} />
      })}
    </div>
  )
}

export default Province
