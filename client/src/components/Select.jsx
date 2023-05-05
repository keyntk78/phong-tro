import React, { memo } from 'react'

const Select = ({ label, options, value, setValue, type, name, invalidFields, setInvaidFields }) => {
  return (
    <div className='flex flex-1 flex-col gap-2'>
      <label className='font-medium' htmlFor='select-address'>
        {label}
      </label>
      <select
        value={value || ''}
        onChange={(e) => (!name ? setValue(e.target.value) : setValue((prev) => ({ ...prev, [name]: e.target.value })))}
        id='select-address'
        onFocus={() => setInvaidFields([])}
        className='w-full rounded-md border border-gray-300 px-1 py-2 outline-none'
      >
        <option value=''>{`--Chọn ${label} --`}</option>
        {options?.map((item) => {
          return (
            <option
              key={type === 'province' ? item?.province_id : type === 'district' ? item?.district_id : item?.code}
              value={type === 'province' ? item?.province_id : type === 'district' ? item?.district_id : item?.code}
            >
              {type === 'province' ? item?.province_name : type === 'district' ? item?.district_name : item?.value}
            </option>
          )
        })}
      </select>
      <small className='text-red-500'>
        {invalidFields?.some((item) => item.name === name) && invalidFields?.find((item) => item.name === name).message}
        {invalidFields?.some((item) => item.name === type) && invalidFields?.find((item) => item.name === type).message}
      </small>
    </div>
  )
}

export default memo(Select)
