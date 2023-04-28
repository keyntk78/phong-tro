import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL
})

instance.interceptors.request.use(
  function (config) {
    let token =
      localStorage.getItem('persist:auth') && JSON.parse(localStorage.getItem('persist:auth'))?.token.slice(1, -1)
    config.headers = {
      token: token ? `Bearer ${token}` : null
    }

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
