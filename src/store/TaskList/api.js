import request from '../request'

const taskListApi = {
  getTaskReq: params => {
    const { taskId } = params
    return request({
      url: `/api/tasks/${taskId}`,
      method: 'GET'
    })
  },
}

export default taskListApi;