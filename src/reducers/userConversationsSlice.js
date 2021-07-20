import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'https://freeflow-two-point-o.herokuapp.com/api/conversations'

export const fetchConversations = createAsyncThunk('conversations/fetchConversations', async (userId) => {
  const response = await axios.get(`${url}/${userId}`)
  return response.data
})

export const addNewMessage = createAsyncThunk(
  'conversations/addNewMessage',
  async (initialMessage) => {
    const {
      senderID,
      receiverID,
      content,
      sender,
      receiver
    } = initialMessage

    const response = await axios.post('https://freeflow-two-point-o.herokuapp.com/api/messages/new', {
      senderID,
      receiverID,
      textInput: content,
      time_sent: new Date().toISOString(),
      sender,
      receiver
    })
    return response.data
  }
)

const initialState = {
  status: 'idle',
  error: null
}

const userConversationSlice = createSlice({
  name: 'userConversations',
  initialState,
  reducers: {
    setUserConversations (state, action) {
      // userConversationDB = action.payload.options[0]
      return action.payload
    },
    addUserConversation (state, action) {
      const user = action.payload

      state.userConversations.messagers.push(action.payload)
      state.userConversations.messages[user.name] = [{ isNew: true, receiverId: user.userId }]
      return state
    },
    addMessageToConversation (state, action) {

    }
  },
  extraReducers: {

    [fetchConversations.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchConversations.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.userConversations = action.payload
    },
    [fetchConversations.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewMessage.fulfilled]: (state, action) => {
      console.log(action.payload)
      const id = action.payload.id
      const receiver = action.payload.receiver
      const receiver_id = action.payload.receiver_id
      const sender = action.payload.sender
      const sender_id = action.payload.sender_id
      const text_body = action.payload.text_body
      const time_sent = action.payload.time_sent
      const active = action.payload.active

      const message = { id, receiver, receiver_id, sender, sender_id, text_body, time_sent, active }
      state.userConversations.messages[receiver].push(message)
    }
  }
})

export const { setUserConversations, addUserConversation, emptyUserDB } = userConversationSlice.actions

export default userConversationSlice.reducer

export const selectAllConversations = state => state.userConversations
