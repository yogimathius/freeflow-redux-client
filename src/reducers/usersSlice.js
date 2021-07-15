import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from '@reduxjs/toolkit'
// import { client } from '../../api/client'
// import { api } from '../../.api/index';
import axios from 'axios'

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState()

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://freeflow-two-point-o.herokuapp.com/api/users')
  return response.data
})

export const fetchUserPosts = createAsyncThunk('users/fetchUserPostings', async () => {
  const response = await axios.get('https://freeflow-two-point-o.herokuapp.com/api/users/:id/postings')
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: usersAdapter.setAll
  }
})

export default usersSlice.reducer

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById
} = usersAdapter.getSelectors((state) => state.users)
