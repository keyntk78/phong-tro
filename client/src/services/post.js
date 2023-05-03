import axiosConfig from '../axiosConfig'
import axios from 'axios'

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

export const apiGetPaginationPosts = async (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'get',
        url: `/api/v1/post/limit`,
        params: query
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })

export const apiGetPaginationAdminPosts = async (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'get',
        url: `/api/v1/post/limit-admin`,
        params: query
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })

export const apiGetNewPosts = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'get',
        url: '/api/v1/post/new-post'
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })

export const apiUploadImage = async (images) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'post',
        url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
        data: images
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })

export const apiCreateNewPost = async (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'post',
        url: '/api/v1/post/create-post',
        data: payload
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
