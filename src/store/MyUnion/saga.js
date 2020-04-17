import { call, takeLatest, fork, put } from 'redux-saga/effects'
import { message } from 'antd'
import myUnionApi from './api'

const {
  applicationSubmitReq,
  getMyunionsReq
} = myUnionApi

// 提交申请
function* applicationSubmit({ payload }) {
  console.log(payload)
  const key = 'submit'
  message.loading({ content: 'loading...', key })
  const result = yield call(applicationSubmitReq, payload)
  const { errorCode } = result
  if (errorCode === 0) {
    message.success({ content: '已提交申请', key })
  }
  else {
    message.error({ content: '申请失败', key })
  }
}

// 获取我的社团
function* getMyUnion() {
  const result = yield call(getMyunionsReq)
  const { errorCode } = result
  if (errorCode === 0) {
    const { data } = result
    yield put({
      type: 'GET_MY_UNION',
      payload: data
    })
  }
}
function* watchApplicationSubmit() {
  yield takeLatest('APPLICATION_SUBMIT', applicationSubmit)
}

function* watchGetMyUnion() {
  yield takeLatest('GET_MYUNION', getMyUnion)
}


export const myUnionSagas = [
  fork(watchApplicationSubmit),
  fork(watchGetMyUnion)
]