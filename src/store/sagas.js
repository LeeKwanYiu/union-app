import { all } from 'redux-saga/effects'

import { loginSagas } from './Login'
import { myUnionSagas } from './MyUnion'
import { applicationSagas } from './Application'
import { taskListSagas } from './TaskList'

export default function* sagas() {
  yield all([
    ...loginSagas,
    ...myUnionSagas,
    ...applicationSagas,
    ...taskListSagas
  ])
}