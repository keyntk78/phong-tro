import React, { memo } from 'react'

const ItemSidebar = () => {
  return (
    <div className='rounded-md bg-white px-4  py-4 shadow-md'>
      <h3 className='text-xl font-semibold'>Danh mục cho thuê</h3>
      <ul>
        <li>Cho thuê phòng trọ</li>
        <li>Cho thuê nhà nguyên căn</li>
        <li>Cho thuê căn hộ</li>
        <li>Cho thuê mặt bằng</li>
        <li></li>
      </ul>
    </div>
  )
}

export default memo(ItemSidebar)
