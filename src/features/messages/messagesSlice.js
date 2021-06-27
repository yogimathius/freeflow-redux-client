import {
    createSlice,
    createAsyncThunk,
    createSelector,
    createEntityAdapter,
  } from '@reduxjs/toolkit';
  import axios from 'axios';
  import { normalize, schema } from 'normalizr'
import StateManager from 'react-select';

  const url = `http://localhost:8080/api/messages`
  
  // const messagesAdapter = createEntityAdapter({
  //   sortComparer: (a, b) => a.time_sent.localeCompare(b.time_sent),
  // })
  
  export const fetchMessages = createAsyncThunk('messages/fetchMessages', async () => {
    const messagesEntity = new schema.Entity('messages')

    const response = await axios.get(url);
    const normalized = normalize(response.data, [messagesEntity])
    // console.log('response in thunk: ', response.data);
    
    return response.data;
  });
  
  const initialState = {
    status: 'idle',
    error: null,
  }
  
//   export const addNewMessage = createAsyncThunk(
//     'messages/addNewMessage',
//     async (initialMessage) => {
//       const {
//         messager_id,
//         post_id,
//         content,
//       } = initialMessage
//       const response = await axios.post(`${url}`, {
//         messager_id,
//         post_id,
//         text_body: content,
//         time_posted: new Date().toISOString(),
//       })
//       return response.data
//     }
//   )
  
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
  
  const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
      messageUpdated(state, action) {
        const { id, content } = action.payload
        const existingPost = state.entities[id]
        if (existingPost) {
          existingPost.content = content
        }
      },
    },
    extraReducers: {
      [fetchMessages.pending]: (state, action) => {
        state.status = 'loading'
      },
      [fetchMessages.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.messages = action.payload;
        // console.log('payload: ', action.payload, 'state: ', state.messages);
      },
      [fetchMessages.rejected]: (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      },
      // [addNewMessage.fulfilled]: messagesAdapter.addOne,
      // [removeMessage.fulfilled]: (state, action) => {
      //   messagesAdapter.removeOne(state, action.meta.arg.id)
      // },
      // [updateMessage.fulfilled]:(state, action) => {
      //   // const { id, ...changes } = payload;
      //   messagesAdapter.upsertOne(state, action.meta.arg)
      // }
    },
  });
  
  export const { messageAdded, messageUpdated } = messagesSlice.actions;
  
  export default messagesSlice.reducer;
  
  export const selectAllMessages = state => state.messages;
  
  export const selectMessagesByUserId = createSelector(
    [selectAllMessages, (state, userId) => userId],
    (state, userId) => {
      // console.log('messages begin: ', messages);
      const userMessages = {}
      if (state.status === 'succeeded') {
        const messages = state.messages
        for (const messageKey in messages) {
          if (Object.hasOwnProperty.call(messages, messageKey)) {
            const message = messages[messageKey];
  
            if (message.sender_id === userId || message.receiver_id === userId) {
              userMessages[messageKey] = message
            }
            
          }
        }
        return userMessages
      }
    }
  )


export const sortMessages = (messages, userId) => {
    const messageMap = {}
    for (const messageKey in messages) {
      if (Object.hasOwnProperty.call(messages, messageKey)) {
        const message = messages[messageKey];
        const sender_id = message.sender_id;
        const receiver_id =message.receiver_id;

        console.log(sender_id, receiver_id);
        if (sender_id !== userId && !messageMap[sender_id]) {
          messageMap[sender_id] = []
          messageMap[sender_id].push(message)
          console.log('in sender check: ', messageMap);
        } 
        if (receiver_id !== userId && !messageMap[receiver_id]) {
          console.log(messageMap);
          messageMap[receiver_id] = [message]        }
        if (receiver_id !== userId && messageMap[receiver_id]) {
          messageMap[receiver_id].push(message)
        } else {
          messageMap[sender_id].push(message)
        }
      }
    }
    return messageMap;
}
