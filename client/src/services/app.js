import axios from 'axios'

export const apiGetPublicProvince = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'get',
        url: 'https://vapi.vnappmob.com/api/province/'
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })

export const apiGetPublicDistrict = async (province_id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'get',
        url: `https://vapi.vnappmob.com/api/province/district/${province_id}`
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
