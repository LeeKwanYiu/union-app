import { call, takeLatest, fork, put } from 'redux-saga/effects'
import taskListApi from './api'
import BraftEditor from 'braft-editor'

const {
  getTaskReq
} = taskListApi

function* getTask({ params }) {
  const result = yield call(getTaskReq, params)
  const { errorCode } = result
  if (errorCode === 0) {
    const data = JSON.parse(JSON.stringify(result.data))
    const detail = BraftEditor.createEditorState(data.detail)
    yield put({
      type: 'SET_TASK',
      payload: data
    })
    yield put({
      type: 'SET_EDITOR',
      payload: detail
    })
    yield put({
      type: 'SET_READONLY',
      payload: true,
    })
  }
}

function* watchGetTask() {
  yield takeLatest('GET_TASK', getTask)
}

export const taskListSagas = [
  fork(watchGetTask)
]