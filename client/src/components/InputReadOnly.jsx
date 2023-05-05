import React from 'react'

const InputReadOnly = ({ value, label, id, flexRow, unit }) => {
  return (
    <div className={`${flexRow ? 'grid grid-cols-10  gap-2' : 'flex flex-col gap-2'}`}>
      <label className={`${flexRow ? 'col-span-2' : ''} font-medium`} htmlFor={id}>
        {label}
      </label>
      <div className={`${flexRow ? 'col-span-8 flex w-full flex-col gap-2 ' : 'flex items-center'}`}>
        <input
          id={id}
          value={value || ''}
          type='text'
          readOnly
          className='w-full rounded-md border border-gray-300 bg-gray-200 px-1 py-2 outline-none'
        />
        {unit && (
          <small className='col-span-8  w-full cursor-pointer text-[16px] text-blue-700' id={unit}>
            Đổi số điện thoại
          </small>
        )}
      </div>
    </div>
  )
}

export default InputReadOnly
