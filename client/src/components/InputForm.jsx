import React, { memo } from 'react'

const InputForm = ({ label, type, value, setValue, name, invalidFaileds, setInvalidFaileds }) => {
  return (
    <div>
      <label
        htmlFor='phone'
        className='text-sm
      '
      >
        {label}
      </label>
      <input
        type={type}
        id='phone'
        value={value}
        onChange={(e) => setValue((prev) => ({ ...prev, [name]: e.target.value }))}
        onFocus={() => setInvalidFaileds([])}
        className='w-full rounded-md bg-secondary3 p-2 outline-none'
      />
      {invalidFaileds.length > 0 && invalidFaileds.some((item) => item.name === name) && (
        <small className='italic text-red-500'>{invalidFaileds.find((item) => item.name === name)?.message}</small>
      )}
    </div>
  )
}

export default memo(InputForm)
