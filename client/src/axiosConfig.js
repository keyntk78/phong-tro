import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL
})

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('persist:auth')
    // gắn token vào header
    return config
  },
  function (err) {
    console.log(err)
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  function (response) {
    const token = localStorage.getItem('persist:auth')
    //refresh token
    return response
  },
  function (err) {
    console.log(err)
    return Promise.reject(err)
  }
)

export default instance
