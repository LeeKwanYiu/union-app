import { all } from 'redux-saga/effects'

import { loginSagas } from './Login'

export default function* sagas() {
  yield all([
    ...loginSagas
  ])
}