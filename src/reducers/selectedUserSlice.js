import {
  createSlice
} from '@reduxjs/toolkit'

const initialState = ([])

export let selectedUserDB = {
  '': ''
}

const selectedUserSlice = createSlice({
  name: 'selectedUserDB',
  initialState: initialState,
  reducers: {
    setSelectedUser (state, action) {
      selectedUserDB = action.payload.options[0]
      return action.payload
    },
    emptyUserDB (state, action) {
      selectedUserDB = null
      return selectedUserDB
    }
  },
  extraReducers: {
  }
})

export const { setSelectedUser, addSelectedSkill, emptyUserDB } = selectedUserSlice.actions

export default selectedUserSlice.reducer
