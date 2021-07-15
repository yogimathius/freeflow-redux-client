import {
  createSlice
} from '@reduxjs/toolkit'

const initialState = ([])

export let userConversationDB = {
  '': ''
}

const userConversationSlice = createSlice({
  name: 'userConversationDB',
  initialState: initialState,
  reducers: {
    setUserConversations (state, action) {
      userConversationDB = action.payload.options[0]
      return action.payload
    },
    clearSelectedUser (state, action) {
      console.log('payload in clear selected user: ', action.payload)
      userConversationDB = userConversationDB.filter(conv => conv.name !== action.payload)
      return userConversationDB
    }
  },
  extraReducers: {
  }
})

export const { setSelectedUser, addSelectedSkill, emptyUserDB } = userConversationSlice.actions

export default userConversationSlice.reducer
