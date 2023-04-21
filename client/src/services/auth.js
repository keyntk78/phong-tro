import axiosConfig from '../axiosConfig'

export const apiRegister = async (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'post',
        url: '/api/v1/auth/register',
        data: payload
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })

export const apiLogin = async (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'post',
        url: '/api/v1/auth/login',
        data: payload
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
