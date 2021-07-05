import {
  createSlice,
  createAsyncThunk
  // createSelector,
  // createEntityAdapter,
} from '@reduxjs/toolkit'
import axios from 'axios'
// import { normalize, schema } from 'normalizr'

const url = 'https://freeflow-two-point-o.herokuapp.com/api/messages'

// const messagesAdapter = createEntityAdapter({
//   sortComparer: (a, b) => a.time_sent.localeCompare(b.time_sent),
// })

export const fetchMessages = createAsyncThunk('messages/fetchMessages', async (userId) => {
  // const messagesEntity = new schema.Entity('messages')
  const response = await axios.get(`${url}/${userId}`)
  // const normalized = normalize(response.data, [messagesEntity])

  return response.data
})

export const addNewMessage = createAsyncThunk(
  'messages/addNewMessage',
  async (initialMessage) => {
    const {
      senderID,
      receiverId,
      content
    } = initialMessage
    console.log(senderID, receiverId, content, 'in thunk')
    const response = await axios.post(`${url}/new`, {
      senderID,
      receiverId,
      textInput: content,
      time_posted: new Date().toISOString()
    })
    console.log('response in thunk: ', response)
    return response.data
  }
)

//   export const removeMessage = createAsyncThunk(
//     'messages/removeMessage',
//     async (initialMessages) => {
//       const { id, post_id, messager_id} = initialMessages
//       const removeMessage = {
//         id,
//         post_id: post_id,
//         messager_id: messager_id
//       };
//       const response = await axios.delete(url, {
//         params: {
//           removeMessage
//         }
//       });
//       return response.post
//     }
//   )

//   export const updateMessage = createAsyncThunk(
//     'messages/updatePost',
//     async (initialPost) => {
//       const { text_body, post_id, messager_id } = initialPost
//       const response = await axios.put(url, { text_body,
//       post_id, messager_id });
//       return response.data
//     }
//   )

const initialState = {
  status: 'idle',
  error: null
}

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
      state.status = 'pending'
    },
    [fetchMessages.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.messages = action.payload
    },
    [fetchMessages.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
    // [addNewMessage.fulfilled]: messagesAdapter.addOne,
    // [removeMessage.fulfilled]: (state, action) => {
    //   messagesAdapter.removeOne(state, action.meta.arg.id)
    // },
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
      const senderid = message.senderid
      const receiverid = message.receiverid
      const senderName = message.sender
      const receiverName = message.receiver

      if (senderid !== userId && !messageMap.messages[senderName]) {
        messageMap.messagers.push(senderName)
        messageMap.messages[senderName] = [message]
      }

      if (senderid !== userId && messageMap.messages[senderName]) {
        messageMap.messages[senderName].push(message)
      }

      if (receiverid !== userId && !messageMap.messages[receiverName]) {
        messageMap.messagers.push(receiverName)
        messageMap.messages[receiverName] = [message]
      }

      if (receiverid !== userId && messageMap.messages[receiverName]) {
        messageMap.messages[receiverName].push(message)
      }
    }
  }

  return messageMap
}
