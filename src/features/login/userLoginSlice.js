import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
// Slice
const url = 'https://freeflow-two-point-o.herokuapp.com/api/login-real'


const initialUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null

const userLoginSlice = createSlice({
  name: 'user',
  initialState: {
    user: initialUser,
  },
  reducers: {
    loginSuccess: (state, action) => {
			state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload))

    },
    logoutSuccess: (state, action) =>  {
			state.user = null;
			localStorage.removeItem('user')
    },
  },
});
export default userLoginSlice.reducer
// Actions
const { loginSuccess, logoutSuccess } = userLoginSlice.actions
export const login = ({ username, password }) => async dispatch => {
  try {
    const res = await axios.post(url, { username, password })
    console.log(res);
    if (res.status === 200) {
      dispatch(loginSuccess({username}));
    }
  } catch (e) {
    return console.error(e.message);
  }
}
export const logout = () => async dispatch => {
  try {
    // const res = await api.post('/api/auth/logout/')
    return dispatch(logoutSuccess())
  } catch (e) {
    return console.error(e.message);
  }
}