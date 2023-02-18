import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
  // createSelector,
} from '@reduxjs/toolkit'
import axios from 'axios'
// import { normalize, schema } from 'normalizr'

const url = '/api/messages'

const messagesAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.time_sent.localeCompare(b.time_sent)
})

export const fetchMessages = createAsyncThunk('messages/fetchMessages', async (userId) => {
  const response = await axios.get(`${url}/${userId}`)

  return response.data
})

export const fetchUnreadCount = createAsyncThunk('messages/fetchMessages', async (userId) => {
  const response = await axios.get(`${url}/unread_count`, { userID: userId })
  return response.data
})

export const addNewMessage = createAsyncThunk(
  'messages/addNewMessage',
  async (initialMessage) => {
    const {
      senderID,
      receiverID,
      content,
      sender,
      receiver
    } = initialMessage

    const response = await axios.post(`${url}/new`, {
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

export const updateMessage = createAsyncThunk(
  'messages/updatePost',
  async (initialPost) => {
    const { text_body, post_id, messager_id } = initialPost
    const response = await axios.put(url, {
      text_body,
      post_id,
      messager_id
    })
    return response.data
  }
)

const initialState = messagesAdapter.getInitialState({
  status: 'idle',
  error: null
})

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    messageUpdated (state, action) {
      const { id, content } = action.payload
      const existingPost = state.entities[id]
      if (existingPost) {
        existingPost.content = content
      }
    }
  },
  extraReducers: {
    [fetchMessages.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchMessages.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      messagesAdapter.setAll(state, action.payload)
    },
    [fetchMessages.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewMessage.fulfilled]: messagesAdapter.addOne,
    [fetchUnreadCount.fulfilled]: (state, action) => {
    }

    // [removeMessage.fulfilled]: (state, action) => {
    //   messagesAdapter.removeOne(state, action.meta.arg.messageId)
    // }
    // [updateMessage.fulfilled]:(state, action) => {
    //   // const { id, ...changes } = payload;
    //   messagesAdapter.upsertOne(state, action.meta.arg)
    // }
  }
})

export const { messageAdded, messageUpdated } = messagesSlice.actions

export default messagesSlice.reducer

export const selectAllMessages = state => state.messages

export const sortMessages = (messages, userId) => {
  const messageMap = {
    messagers: [],
    messages: {}
  }
  for (const messageKey in messages) {
    if (Object.hasOwnProperty.call(messages, messageKey)) {
      const message = messages[messageKey]
      const senderid = message.sender_id
      const receiverid = message.receiver_id
      const senderName = message.sender
      const receiverName = message.receiver

      if (senderid !== userId && !messageMap.messages[senderName]) {
        const messager = { name: senderName, userId: senderid }
        messageMap.messagers.push(messager)
        messageMap.messages[senderName] = [message]
      }

      if (senderid !== userId && messageMap.messages[senderName]) {
        messageMap.messages[senderName].push(message)
      }

      if (receiverid !== userId && !messageMap.messages[receiverName]) {
        const messager = { name: receiverName, userId: receiverid }

        messageMap.messagers.push(messager)
        messageMap.messages[receiverName] = [message]
      }

      if (receiverid !== userId && messageMap.messages[receiverName]) {
        messageMap.messages[receiverName].push(message)
      }
    }
  }

  return messageMap
}
