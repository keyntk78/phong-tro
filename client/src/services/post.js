import axiosConfig from '../axiosConfig'

export const apiGetPosts = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'get',
        url: '/api/v1/post/all'
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })

export const apiGetPaginationPosts = async (page) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'get',
        url: `/api/v1/post/limit?page=${page}`
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
