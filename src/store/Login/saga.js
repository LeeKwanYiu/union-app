import { call, takeLatest, fork, put } from 'redux-saga/effects'
import loginApi from './api'

const {
  loginRequest,
  getUserRequest
} = loginApi

function* login({ payload, history }) {
  const result = yield call(loginRequest, payload)
  const { errorCode } = result
  if (errorCode === 0) {
    const { data } = result
    const token = data.token
    const role = data.role
    localStorage.setItem('token', token)
    localStorage.setItem('union_role', role)
    delete data.token
    yield put({
      type: 'USER_INIT',
      payload: data,
    })
    if (role === 'user')
      history.push('/')
    else
      history.push('/application')
  }
}

function* getUserInfo({ payload, history }) {
  const result = yield call(getUserRequest)
  const { errorCode } = result
  if (errorCode === 0) {
    const { data } = result
    yield put({
      type: 'USER_INIT',
      payload: data
    })
  }
}

function* watchLogin() {
  yield takeLatest('LOGIN', login)
}

function* watchGetUserLogin() {
  yield takeLatest('GET_USER_INFO', getUserInfo)
}

export const loginSagas = [
  fork(watchLogin),
  fork(watchGetUserLogin)
]