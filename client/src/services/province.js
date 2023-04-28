import axiosConfig from '../axiosConfig'

export const apiGetProvinces = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'get',
        url: '/api/v1/province/all'
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
