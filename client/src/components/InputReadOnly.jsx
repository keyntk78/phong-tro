import React from 'react'

const InputReadOnly = ({ value, label, id }) => {
  return (
    <div className='flex flex-col gap-2'>
      <label className='font-medium' htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        value={value || ''}
        type='text'
        readOnly
        className='rounded-md border border-gray-300 bg-gray-200 px-1 py-2 outline-none'
      />
    </div>
  )
}

export default InputReadOnly
