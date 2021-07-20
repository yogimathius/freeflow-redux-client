import {
  createSlice
} from '@reduxjs/toolkit'

const initialState = ([])

export let selectedUserDB = {
  '': ''
}

let currentPage

const selectedUserSlice = createSlice({
  name: 'selectedUserDB',
  initialState: initialState,
  reducers: {
    setSelectedUser (state, action) {
      selectedUserDB = action.payload.options
      return action.payload
    },
    emptyUserDB (state, action) {
      selectedUserDB = null
      return selectedUserDB
    },
    setCurrentPage (state, action) {
      currentPage = action.payload
      return currentPage
    }
  },
  extraReducers: {
  }
})

export const { setSelectedUser, addSelectedSkill, emptyUserDB, setCurrentPage } = selectedUserSlice.actions

export default selectedUserSlice.reducer
