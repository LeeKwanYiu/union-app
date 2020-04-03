import { call, takeLatest, fork, put } from 'redux-saga/effects'
import loginApi from './api'

const {
  loginRequest
} = loginApi

function* login({ payload, history }) {
  const result = yield call(loginRequest, payload)
  const { errorCode } = result
  if (errorCode === 0) {
    const { data } = result
    const { id = '', name = '', token = '' } = data
    const user_role = name === 'admin' ? 'admin' : 'user'
    localStorage.setItem('token', token)
    yield put({
      type: 'USER_LOGIN',
      payload: {
        user_id: id,
        user_name: name,
        user_role,
      },
    })
    history.push('/')
  }
}

function* watchLogin() {
  yield takeLatest('LOGIN', login)
}

export const loginSagas = [
  fork(watchLogin)
]