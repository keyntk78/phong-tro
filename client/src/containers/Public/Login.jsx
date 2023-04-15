import React from 'react'
import { Button, InputForm } from '../../components'

const Login = () => {
  return (
    <div className='w-[600px] rounded-md bg-white p-[30px] pb-[100px] shadow-sm'>
      <h3 className='text-2xl font-semibold'>Đăng Nhập</h3>
      <div className='flex w-full flex-col gap-3'>
        <InputForm label='Số điện thoại' type={'text'} />
        <InputForm label='Mật khẩu' type={'password'} />
        <Button text='Đăng nhập' textColor='text-white' bgColor='bg-secondary1' fullWidth />
        <div className='flex items-center justify-between'>
          <span className='cursor-pointer text-blue-500 hover:text-orange-500'>Bạn quên mật khẩu</span>
          <span className='cursor-pointer  text-blue-500 hover:text-orange-500'>Tạo tài khoản mới</span>
        </div>
      </div>
    </div>
  )
}

export default Login
