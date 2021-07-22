import {
  createSlice
} from '@reduxjs/toolkit'

const initialState = ''

const currentPageSlice = createSlice({
  name: 'currentPage',
  initialState: initialState,
  reducers: {
    setCurrentPage (state, action) {
      state = action.payload
      return action.payload
    }
  },
  extraReducers: {
  }
})

export const { setCurrentPage } = currentPageSlice.actions

export default currentPageSlice.reducer
