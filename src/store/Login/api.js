import request from '../request'

const loginApi = {
  loginRequest: data => {
    return request({
      url: '/api/login',
      method: "POST",
      data
    })
  }
}

export default loginApi;