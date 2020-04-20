const _state = {
  taskList: [],
  users: [],
  admins: [],
  noteList: [],
  task: {}, // 富文本框内容
  editorContent: null,
  readOnly: true
}

export function taskListReducer(state = _state, { payload, type }) {
  switch (type) {
    case 'SET_TASKLIST':
      return { ...state, taskList: payload }
    case 'SET_USERS':
      return { ...state, users: payload }
    case 'SET_ADMINS':
      return { ...state, admins: payload }
    case 'SET_NOTELIST':
      return { ...state, noteList: payload }
    case 'SET_TASK':
      return { ...state, task: payload }
    case 'SET_EDITOR':
      return { ...state, editorContent: payload }
    case 'SET_READONLY':
      return { ...state, readOnly: payload }
    default:
      return state
  }
}