import request from '../request'

const myUnionApi = {
  applicationSubmitReq: data => {
    return request({
      url: '/api/application',
      method: "POST",
      data
    })
  },
  getMyunionsReq: () => {
    return request({
      url: '/api/myunion',
      method: "GET"
    })
  }
}

export default myUnionApi;