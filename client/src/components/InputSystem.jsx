import React from 'react'

const InputSystem = ({ label, unit, value, setValue, name, small, invalidFields, setInvaidFields, flexRow }) => {
  return (
    <div>
      <div className={`${flexRow ? 'grid grid-cols-10  gap-2' : 'flex flex-col gap-2'}`}>
        <label htmlFor='title' className={`${flexRow ? 'col-span-2' : ''} font-medium`}>
          {label}
        </label>
        <div className={`${flexRow ? 'col-span-8 w-full' : 'flex items-center'}`}>
          <input
            value={value || ''}
            onChange={(e) => setValue((prev) => ({ ...prev, [name]: e.target.value }))}
            onFocus={() => setInvaidFields([])}
            type='text'
            id='title'
            className={`w-full flex-auto  ${
              unit ? 'rounded-bl-md rounded-tl-md' : 'rounded-md'
            } border border-gray-300 px-1 py-2 outline-none`}
          />
          {unit && (
            <span className='flex w-16 flex-none items-center justify-center rounded-br-md rounded-tr-md border border-gray-400 bg-slate-400  p-2 '>
              {unit}
            </span>
          )}
        </div>
        {small && <small>{small}</small>}
      </div>
      <small className='text-red-500'>
        {invalidFields?.some((item) => item.name === name) && invalidFields?.find((item) => item.name === name).message}
      </small>
    </div>
  )
}

export default InputSystem
