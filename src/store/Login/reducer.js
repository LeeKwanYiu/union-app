const _state = {
  userInfo: {}
}

export function loginReducer(state = _state, { payload, type }) {
  switch (type) {
    case 'USER_INIT':
      return { ...state, userInfo: payload }
    default:
      return state
  }
}