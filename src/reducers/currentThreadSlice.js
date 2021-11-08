import {
  createSlice
} from '@reduxjs/toolkit'

const initialState = ''

const currentThreadSlice = createSlice({
  name: 'currentThread',
  initialState: initialState,
  reducers: {
    setCurrentThread (state, action) {
      state = action.payload
      return action.payload
    }
  },
  extraReducers: {
  }
})

export const { setCurrentThread } = currentThreadSlice.actions

export default currentThreadSlice.reducer
