import { call, takeLatest, fork, put } from 'redux-saga/effects'
import { message } from 'antd'
import applicationApi from './api'

const {
  getApplicationReq,
  oprateApplicationReq
} = applicationApi

// 获取申请列表
function* getApplicationList({ payload }) {
  yield put({
    type: 'GET_LOADING',
    payload: true
  })
  const result = yield call(getApplicationReq, payload)
  const { errorCode } = result
  if (errorCode === 0) {
    const { data } = result
    const {
      total,
      currentPage,
      pageSize,
      list
    } = data
    yield put({
      type: 'GET_LIST',
      payload: list
    })
    yield put({
      type: 'GET_TOTAL',
      payload: total
    })
    yield put({
      type: 'GET_PAGESIZE',
      payload: pageSize
    })
    yield put({
      type: 'GET_CURRENTPAGE',
      payload: currentPage
    })
    yield put({
      type: 'GET_LOADING',
      payload: false
    })
  }
}

// 操作申请
function* operateApplication({ payload, refresh_payload }) {
  console.log(refresh_payload)
  message.loading({ content: 'loading...', key: 'operation' })
  const result = yield call(oprateApplicationReq, payload)
  const { errorCode } = result
  if (errorCode === 0) {
    message.success({ content: '操作成功', key: 'operation' })
    yield call(getApplicationList, { payload: refresh_payload })
  }
}

function* watchgetApplicationList() {
  yield takeLatest('APPLICATION_GET', getApplicationList)
}

function* watchOperateApplication() {
  yield takeLatest('OPERATION', operateApplication)
}


export const applicationSagas = [
  fork(watchgetApplicationList),
  fork(watchOperateApplication)
]