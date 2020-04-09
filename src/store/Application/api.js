import request from '../request'

const applicationApi = {
  getApplicationReq: data => {
    return request({
      url: '/api/applicationlist',
      method: "POST",
      data
    })
  },
  oprateApplicationReq: data => {
    return request({
      url: '/api/application/operation',
      method: "POST",
      data
    })
  }
}

export default applicationApi;