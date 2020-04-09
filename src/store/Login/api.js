import request from '../request'

const loginApi = {
  loginRequest: data => {
    return request({
      url: '/api/login',
      method: "POST",
      data
    })
  },
  getUserRequest: data => {
    return request({
      url: '/api/user',
      method: "GET",
      data
    })
  }
}

export default loginApi;