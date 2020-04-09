export const loginActions = {
  login: (params = {}) => ({
    type: 'USER_INIT',
    payload: params
  })
}