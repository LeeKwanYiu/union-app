const _state = {
  user_id: '',
  user_name: '',
  user_role: 'user',
}

export function loginReducer(state = _state, { payload, type }) {
  switch (type) {
    case 'USER_LOGIN':
      const {
        user_id = '',
        user_name = '',
        user_role = 'user'
      } = payload
      return { user_id, user_name, user_role }
    default:
      return state
  }
}