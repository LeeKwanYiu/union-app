export const loginActions = {
  login: (params = {}) => ({
    type: 'USER_LOGIN',
    payload: params
  })
}