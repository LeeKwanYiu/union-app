import axios from 'axios'
import { notification } from 'antd'

const request = axios.create({
  timeout: 10000
})

request.interceptors.request.use(
  config => {
    if (localStorage.getItem("token")) {
      config.headers["Authorization"] = localStorage.getItem("token")
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    const { data = {} } = response
    const {
      errorCode = '',
      errorMsg = ''
    } = data
    if (errorCode !== 0) {
      notification['error']({
        message: errorCode,
        description: errorMsg,
        duration: 2,
      })
    }
    if (errorCode === 20002) {
      localStorage.removeItem('token')
      window.location.pathname = '/login'
    }
    return data
  },
  error => {
    return Promise.reject(error)
  }
)

export default request