import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit'
import axiosInstance from '../axiosInstance'

const url = '/api/conversations'

export const fetchConversations = createAsyncThunk('conversations/fetchConversations', async (userId) => {
  const response = await axiosInstance.get(`${url}/${userId}`)
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

    const response = await axiosInstance.post('/api/messages/new', {
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

export const removeMessage = createAsyncThunk(
  'conversations/removeMessage',
  async (initialMessages) => {
    const { messageId } = initialMessages
    const response = await axiosInstance.delete(`/api/messages/${messageId}`, {
      params: {
        messageId
      }
    })
    return response.data
  }
)

export const updateMessage = createAsyncThunk(
  'messages/updatePost',
  async (initialPost) => {
    const { text_body, post_id, messager_id } = initialPost
    const response = await axiosInstance.put(url, {
      text_body,
      post_id,
      messager_id
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
      const id = action.payload.id
      const receiver = action.payload.receiver
      const receiver_id = action.payload.receiver_id
      const sender = action.payload.sender
      const sender_id = action.payload.sender_id
      const text_body = action.payload.text_body
      const time_sent = action.payload.time_sent
      const active = action.payload.active
      const message = { id, receiver, receiver_id, sender, sender_id, text_body, time_sent, active }
      if (state.userConversations.messages[receiver]) {
        state.userConversations.messages[receiver].push(message)
      } else {
        state.userConversations.messages[receiver] = []
        state.userConversations.messages[receiver].push(message)
      }
    },
    [removeMessage.fulfilled]: (state, action) => {
      const id = action.meta.arg.messageId
      const receiver = action.meta.arg.receiver
      state.userConversations.messages[receiver] = state.userConversations.messages[receiver].filter(message => {
        return message.id !== id
      })
    }
  }
})

export const { setUserConversations, addUserConversation, emptyUserDB } = userConversationSlice.actions

export default userConversationSlice.reducer

export const selectAllConversations = state => state.userConversations
