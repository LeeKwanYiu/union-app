import { all } from 'redux-saga/effects'

import { loginSagas } from './Login'
import { myUnionSagas } from './MyUnion'
import { applicationSagas } from './Application'

export default function* sagas() {
  yield all([
    ...loginSagas,
    ...myUnionSagas,
    ...applicationSagas
  ])
}