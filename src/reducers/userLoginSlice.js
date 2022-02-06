import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { loadState } from '../helpers/localStorage'
// Slice
const url = 'https://freeflow-two-point-o.herokuapp.com/api/login-real'

const initialUser = loadState()

const userLoginSlice = createSlice({
  name: 'user',
  initialState: {
    user: initialUser
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    logoutSuccess: (state, action) => {
      state.user = null
      localStorage.removeItem('user')
    }
  }
})
export default userLoginSlice.reducer
// Actions
const { loginSuccess, logoutSuccess } = userLoginSlice.actions

export const login = ({ username, password }) => async dispatch => {
  try {
    const res = await axios.post(url, { username, password })
    if (res.status === 200) {
      const userId = res.data[0]
      dispatch(loginSuccess(userId))
    }
  } catch (e) {
    return console.error(e.message)
  }
}
export const logout = () => async dispatch => {
  try {
    // const res = await api.post('/api/auth/logout/')
    return dispatch(logoutSuccess())
  } catch (e) {
    return console.error(e.message)
  }
}
