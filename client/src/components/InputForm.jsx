import React, { memo } from 'react'

const InputForm = ({ label, type }) => {
  return (
    <div>
      <label
        htmlFor='phone'
        className='text-sm
      '
      >
        {label}
      </label>
      <input type={type} id='phone' className='w-full rounded-md bg-secondary3 p-2 outline-none' />
    </div>
  )
}

export default memo(InputForm)
