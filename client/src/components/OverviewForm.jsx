import React from 'react'
import { Select, InputReadOnly, InputSystem } from '../components'
import { useSelector } from 'react-redux'

const targets = [
  { code: 'Tất cả', value: 'Tất cả' },
  { code: 'Nam', value: 'Nam' },
  { code: 'Nữ', value: 'Nữ' }
]

const OverviewForm = ({ payload, setPayload, invalidFields, setInvaidFields }) => {
  const { categories } = useSelector((state) => state.app)
  const { currentData } = useSelector((state) => state.user)

  return (
    <div>
      <h2 className='py-4 text-xl font-semibold'>Thông tin mô tả</h2>
      <div className='flex flex-col gap-2'>
        <Select
          label={'Loại chuyên mục'}
          name={'categoryCode'}
          options={categories}
          setValue={setPayload}
          value={payload}
          invalidFields={invalidFields}
          setInvaidFields={setInvaidFields}
        />
        <InputSystem
          value={payload.title}
          setValue={setPayload}
          name={'title'}
          label={'Tiêu đề'}
          invalidFields={invalidFields}
          setInvaidFields={setInvaidFields}
        />
        <div className='flex flex-col gap-2'>
          <label htmlFor='description' className='font-medium'>
            Nội dung mô tả
          </label>
          <textarea
            value={payload.description}
            onChange={(e) => setPayload((prev) => ({ ...prev, description: e.target.value }))}
            id='description'
            onFocus={() => setInvaidFields([])}
            className='w-full rounded-md border border-gray-300 px-1 py-2 outline-none'
            rows={10}
          ></textarea>
          <small className='text-red-500'>
            {invalidFields?.some((item) => item.name === 'description') &&
              invalidFields?.find((item) => item.name === 'description').message}
          </small>
        </div>
        <div className='flex w-1/2 flex-col gap-4'>
          <InputReadOnly label={'Thông tin liên hệ'} id={'ttlh'} value={currentData?.name} />
          <InputReadOnly label={'Điện thoại'} id={'dt'} value={currentData?.phone} />
          <InputSystem
            label={'Giá cho thuê'}
            unit={'đồng'}
            small={'Nhập đầy đủ số, ví dụ 1 triệu là 1000000'}
            name={'priceNumber'}
            value={payload.priceNumber}
            setValue={setPayload}
            invalidFields={invalidFields}
            setInvaidFields={setInvaidFields}
          />
          <InputSystem
            label={'Diện tích'}
            unit={'m2'}
            name={'areaNumber'}
            value={payload.areaNumber}
            setValue={setPayload}
            invalidFields={invalidFields}
            setInvaidFields={setInvaidFields}
          />
          <Select
            options={targets}
            label={'Đối tượng cho thuê'}
            name={'target'}
            value={payload.target}
            setValue={setPayload}
            invalidFields={invalidFields}
            setInvaidFields={setInvaidFields}
          />
        </div>
      </div>
    </div>
  )
}

export default OverviewForm
