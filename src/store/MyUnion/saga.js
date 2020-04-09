import { call, takeLatest, fork } from 'redux-saga/effects'
import { message } from 'antd'
import myUnionApi from './api'

const {
  applicationSubmitReq
} = myUnionApi

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

function* watchApplicationSubmit() {
  yield takeLatest('APPLICATION_SUBMIT', applicationSubmit)
}


export const myUnionSagas = [
  fork(watchApplicationSubmit)
]