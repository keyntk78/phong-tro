import axiosConfig from '../axiosConfig'

export const apiGetCurentUser = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'get',
        url: '/api/v1/user/get-current'
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
