import request from '../request'

const myUnionApi = {
  applicationSubmitReq: data => {
    return request({
      url: '/api/application',
      method: "POST",
      data
    })
  },
}

export default myUnionApi;