import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from '@reduxjs/toolkit'
// import { client } from '../../api/client'
// import { api } from '../../.api/index';
import axiosInstance from '../axiosInstance'

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState({
  status: 'idle'
})

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axiosInstance.get('/api/users')
  return response.data
})

export const fetchUserPosts = createAsyncThunk('users/fetchUserPostings', async () => {
  const response = await axiosInstance.get('/api/users/:id/postings')
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      usersAdapter.setAll(state, action.payload)
    }
  }
})

export default usersSlice.reducer

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById
} = usersAdapter.getSelectors((state) => state.users)
