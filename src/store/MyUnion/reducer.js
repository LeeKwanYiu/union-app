const _state = {
  loading: false,
  myUnion: []
}

export function myUnionReducer(state = _state, { payload, type }) {
  switch (type) {
    case 'GET_MY_UNION':
      return { ...state, myUnion: payload }
    default:
      return state
  }
}