import React, { useState } from 'react'
import { InputReadOnly, InputSystem, Button } from '../../components'
import nonAvatar from '../../assets/images/avatar.png'
import { useSelector, useDispatch } from 'react-redux'
import { apiUpdateUser } from '../../services'
import { fileToBase64, blogTobase64 } from '../../ultils/common/tobase64'
import * as actions from '../../store/actions'
import Swal from 'sweetalert2'

const EditAccount = () => {
  const [invalidFields, setInvalidFields] = useState([])
  const dispatch = useDispatch()
  const { currentData } = useSelector((state) => state.user)
  const [payload, setPayload] = useState({
    avatar: currentData?.avatar ? blogTobase64(currentData?.avatar) : '',
    name: currentData?.name,
    fbUrl: currentData?.fbUrl || '',
    zalo: currentData?.zalo || ''
  })

  const handleSubmit = async () => {
    const response = await apiUpdateUser(payload)
    if (response?.data.err === 0) {
      Swal.fire('Thành công!', 'Chỉnh sửa thông tin cá nhân thành công!', 'success').then(() => {
        dispatch(actions.getCurrentUser())
      })
    } else {
      Swal.fire('Opps!', 'Chỉnh suawr thông tin cá nhân thất bại!', 'error')
    }
  }

  const handleUploadFile = async (e) => {
    const imageBase64 = await fileToBase64(e.target.files[0])
    setPayload((prev) => ({ ...prev, avatar: imageBase64 }))
  }

  return (
    <div className='col-span-10 flex w-full flex-col items-center  gap-6 overflow-y-scroll bg-white px-8 py-4 shadow-md'>
      <h1 className='w-full border-b py-4 text-start text-3xl font-medium'>Chỉnh sửa thông tin cá nhân</h1>
      <div className='flex w-3/5 flex-col gap-4'>
        <InputReadOnly label={'Số điện thoại'} flexRow unit={'phone'} value={currentData?.phone} />
        <InputSystem
          flexRow
          label={'Họ và tên'}
          invalidFields={invalidFields}
          setInvaidFields={setInvalidFields}
          value={payload.name}
          name={'name'}
          setValue={setPayload}
        />
        <InputSystem
          flexRow
          label={'Zalo'}
          value={payload.zalo}
          invalidFields={invalidFields}
          setInvaidFields={setInvalidFields}
          name={'zalo'}
          setValue={setPayload}
        />
        <InputSystem
          flexRow
          label={'Facebook'}
          value={payload.fbUrl}
          invalidFields={invalidFields}
          setInvaidFields={setInvalidFields}
          setValue={setPayload}
          name={'fbUrl'}
        />
        <div className='grid grid-cols-10 gap-2'>
          <label htmlFor='password' className='col-span-2 font-medium'>
            Mật khẩu
          </label>
          <small className='col-span-8 w-full cursor-pointer text-[16px] text-blue-700' id='password'>
            Đổi mật khẩu
          </small>
        </div>
        <div className='mb-6 mt-2 grid grid-cols-10 gap-2'>
          <label htmlFor='avatar' className='col-span-2 font-medium'>
            Ảnh đại diện
          </label>
          <div className='col-span-8'>
            <img src={payload.avatar || nonAvatar} alt='avatar' className=' h-[100px] w-[100px] rounded-full' />
            <input type='file' onChange={handleUploadFile} id='avatar' className='my-4 appearance-none' />
          </div>
        </div>

        <Button onClick={handleSubmit} text={'Cập nhật'} bgColor={'bg-blue-700'} textColor={'text-white'} />

        <div className='h-[100px]'></div>
      </div>
    </div>
  )
}

export default EditAccount
