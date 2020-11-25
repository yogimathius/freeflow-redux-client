import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'
// import { client } from '../../api/client'
// import { api } from '../../.api/index';
import axios from 'axios';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('http://localhost:8000/api/users');
  // console.log("fetchUsers from userSlice: ", response.data);
  return response.data;
});

export const fetchUserPosts = createAsyncThunk('users/fetchUserPostings', async () => {
  const response = await axios.get('http://localhost:8000/api/users/:id/postings');
  // console.log('fetchPosts from postsSlice: ', response.data)
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
      loginSuccess: (state, action) => {
        state.user = action.payload;
      },
      logoutSuccess: (state, action) =>  {
        state.user = null;
      },
  },
  extraReducers: {
    [fetchUsers.fulfilled]: usersAdapter.setAll,
  },
})

export default usersSlice.reducer

const { loginSuccess, logoutSuccess } = usersSlice.actions

export const login = ({ username, password }) => async dispatch => {
  try {
    // const res = await api.post('/api/auth/login/', { username, password })
    dispatch(loginSuccess({username}));
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

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors((state) => state.users)
