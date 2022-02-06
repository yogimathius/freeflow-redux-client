const username = global.localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user')).username
  : ''
const token = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user')).auth_token
  : ''

export const initialState = {
  username: username,
  token: token,
  loading: false,
  errorMessage: null
}

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...initialState,
        loading: true
      }
    case 'LOGIN_SUCCESS':

      return {
        ...initialState,
        username: action.payload.username,
        id: action.payload.id,
        token: action.payload.password,
        loading: false
      }
    case 'LOGOUT':
      return {
        ...initialState,
        user: '',
        token: ''
      }

    case 'LOGIN_ERROR':
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}
