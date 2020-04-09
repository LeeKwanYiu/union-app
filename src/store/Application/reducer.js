const _state = {
  total: 0,
  currentPage: 1,
  pageSize: 10,
  list: [],
  loading: true
}

export function applicationReducer(state = _state, { payload, type }) {
  switch (type) {
    case 'GET_TOTAL':
      return { ...state, total: payload }
    case 'GET_CURRENTPAGE':
      return { ...state, currentPage: payload }
    case 'GET_PAGESIZE':
      return { ...state, pageSize: payload }
    case 'GET_LIST':
      return { ...state, list: payload }
    case 'GET_LOADING':
      return { ...state, loading: payload }
    default:
      return state
  }
}