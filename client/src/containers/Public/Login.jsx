import React, { useEffect, useState } from 'react'
import { Button, InputForm } from '../../components'
import { useLocation, useNavigate } from 'react-router-dom'
import * as actions from '../../store/actions/index'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import validate from './../../ultils/common/validateField'

const Login = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoggedIn, msg, update } = useSelector((state) => state.auth)
  const [isRegister, setIsRegister] = useState(location.state?.flag)
  const [payload, setPayload] = useState({ phone: '', password: '', name: '' })
  const [invalidFaileds, setInvalidFaileds] = useState([])

  useEffect(() => {
    setIsRegister(location.state?.flag)
    setPayload({ phone: '', password: '', name: '' })
    setInvalidFaileds([])
  }, [location.state?.flag])

  useEffect(() => {
    isLoggedIn && navigate('/')
  }, [isLoggedIn])

  useEffect(() => {
    if (msg === 'Phone number has been already used!') {
      msg && Swal.fire('Lỗi!', 'Số điện thoại đã tồn tại.', 'error')
    } else if (msg === 'Phone is not exist!' || msg === 'Password is not exist!') {
      msg && Swal.fire('Lỗi!', 'Số điện thoại hoặc mật khẩu không hợp lệ', 'error')
    } else {
      msg && Swal.fire('Oops!', msg, 'error')
    }
  }, [msg, update])

  const handleSubmit = async () => {
    let finalPayload = isRegister ? payload : { phone: payload.phone, password: payload.password }
    let invalid = validate(finalPayload, setInvalidFaileds)
    if (invalid === 0) {
      isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(payload))
    }
  }

  // const validate = (payload) => {
  //   let invalids = 0
  //   let fields = Object.entries(payload)
  //   fields.forEach((item) => {
  //     if (item[1] === '') {
  //       setInvalidFaileds((prev) => [...prev, { name: item[0], message: 'Bạn không được bỏ trống trường này' }])

  //       invalids++
  //     }
  //   })

  //   fields.forEach((item) => {
  //     switch (item[0]) {
  //       case 'password':
  //         if (item[1].length < 6) {
  //           setInvalidFaileds((prev) => [...prev, { name: item[0], message: 'Mật khẩu phải có tối thiểu 6 ký tự' }])

  //           invalids++
  //         }
  //         break

  //       case 'phone':
  //         if (!+item[1]) {
  //           setInvalidFaileds((prev) => [...prev, { name: item[0], message: 'Số điện thoại không hợp lệ' }])
  //           invalids++
  //         }
  //         break

  //       default:
  //         break
  //     }
  //   })

  //   return invalids
  // }

  return (
    <div className='flex w-full justify-center'>
      <div className=' w-[600px] rounded-md bg-white p-[30px] pb-[100px] shadow-sm'>
        <h3 className='text-center text-2xl font-semibold'>{isRegister ? 'Đăng ký tài khoản' : 'Đăng nhập'}</h3>
        <div className='flex w-full flex-col gap-3'>
          {isRegister && (
            <InputForm
              setInvalidFaileds={setInvalidFaileds}
              invalidFaileds={invalidFaileds}
              label='HỌ TÊN'
              type={'text'}
              value={payload.name}
              setValue={setPayload}
              name={'name'}
            />
          )}
          <InputForm
            invalidFaileds={invalidFaileds}
            setInvalidFaileds={setInvalidFaileds}
            label='SỐ ĐIỆN THOẠI'
            type={'text'}
            value={payload.phone}
            setValue={setPayload}
            name={'phone'}
          />
          <InputForm
            invalidFaileds={invalidFaileds}
            setInvalidFaileds={setInvalidFaileds}
            label='MẬT KHẨU'
            type={'password'}
            value={payload.password}
            setValue={setPayload}
            name={'password'}
          />
          <Button
            text={isRegister ? 'Đăng ký' : 'Đăng nhập'}
            textColor='text-white'
            bgColor='bg-secondary1'
            fullWidth
            onClick={handleSubmit}
          />
          <div className='flex items-center justify-between'>
            {isRegister ? (
              <span className='text-blue-500'>
                Bạn đã có tài khoản?
                <span
                  onClick={() => {
                    setIsRegister(false)
                    setPayload({ name: '', phone: '', password: '' })
                    setInvalidFaileds([])
                  }}
                  className='cursor-pointer hover:text-orange-500'
                >
                  Đăng nhập ngay
                </span>
              </span>
            ) : (
              <>
                <span className='cursor-pointer text-blue-500 hover:text-orange-500'>Bạn quên mật khẩu</span>
                <span
                  onClick={() => {
                    setIsRegister(true)
                    setPayload({ name: '', phone: '', password: '' })
                    setInvalidFaileds([])
                  }}
                  className='cursor-pointer  text-blue-500 hover:text-orange-500'
                >
                  Tạo tài khoản mới
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
