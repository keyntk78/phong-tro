import React, { memo, useEffect, useState } from 'react'
import { Select, InputReadOnly } from '../components'
import { apiGetPublicProvince, apiGetPublicDistrict } from '../services'
import { useSelector } from 'react-redux'

const AddressForm = ({ setPayload, invalidFields, setInvaidFields, clearValue }) => {
  const { dataEdit } = useSelector((state) => state.posts)

  const [provinces, setProvinces] = useState([])
  const [province, setProvince] = useState('')
  const [districts, setDistricts] = useState([])
  const [district, setDistrict] = useState('')

  useEffect(() => {
    if (clearValue) {
      setProvince('')
      setDistrict('')
    }
  }, [clearValue])

  useEffect(() => {
    if (dataEdit) {
      let addressArr = dataEdit?.address?.split(',')
      let foundProvince =
        provinces?.length > 0 &&
        provinces?.find((item) => item.province_name === addressArr[addressArr?.length - 1]?.trim())
      setProvince(foundProvince ? foundProvince.province_id : '')
    }
  }, [provinces, dataEdit])

  useEffect(() => {
    if (dataEdit) {
      let addressArr = dataEdit?.address?.split(',')

      let foundProvince =
        districts?.length > 0 &&
        districts?.find((item) => item.district_name === addressArr[addressArr?.length - 2]?.trim())
      setDistrict(foundProvince ? foundProvince.district_id : '')
    }
  }, [districts, dataEdit])

  useEffect(() => {
    const fetchPublicProvince = async () => {
      const respone = await apiGetPublicProvince()
      setProvinces(respone?.data.results)
    }
    fetchPublicProvince()
  }, [])

  useEffect(() => {
    setDistrict(null)
    const fetchPublicDistrict = async () => {
      const respone = await apiGetPublicDistrict(province)
      setDistricts(respone?.data.results)
    }
    if (province) {
      province && fetchPublicDistrict()
    } else {
      setDistricts([])
    }
  }, [province])

  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      address: `${district ? `${districts.find((item) => item.district_id === district).district_name}, ` : ''}${
        province ? `${provinces.find((item) => item.province_id === province).province_name}` : ''
      }`,
      province: `${province ? `${provinces.find((item) => item.province_id === province).province_name}` : ''}`,
      district: `${district ? `${districts.find((item) => item.district_id === district).district_name}` : ''}`
    }))
  }, [province, district])

  return (
    <div>
      <h2 className='py-4 text-xl font-semibold'>Địa chỉ cho thuê</h2>
      <div className='flex flex-col gap-4'>
        <div className='grid grid-cols-2 gap-4'>
          <Select
            label={'Tỉnh/Thành phố'}
            type={'province'}
            value={province}
            setValue={setProvince}
            options={provinces}
            invalidFields={invalidFields}
            setInvaidFields={setInvaidFields}
          />
          <Select
            invalidFields={invalidFields}
            label={'Quận/Huyện'}
            type={'district'}
            value={district}
            setValue={setDistrict}
            options={districts}
            setInvaidFields={setInvaidFields}
          />
        </div>
        <InputReadOnly
          id={'dccx'}
          label={'Địa chỉ chính xác'}
          value={`${district ? `${districts.find((item) => item.district_id === district).district_name}, ` : ''}${
            province ? `${provinces.find((item) => item.province_id === province).province_name}` : ''
          }`}
        />
      </div>
    </div>
  )
}

export default memo(AddressForm)
