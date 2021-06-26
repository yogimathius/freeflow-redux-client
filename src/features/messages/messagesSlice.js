import {
    createSlice,
    createAsyncThunk,
    createSelector,
    createEntityAdapter,
  } from '@reduxjs/toolkit';
  import axios from 'axios';
  import { normalize, schema } from 'normalizr'

  const url = `https://freeflow-two-point-o.herokuapp.com/api/messages`
  
  const messagesAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.time_sent.localeCompare(b.time_sent),
  })
  
  export const fetchMessages = createAsyncThunk('messages/fetchMessages', async () => {
    const messagesEntity = new schema.Entity('messages')

    const response = await axios.get(url);
    const normalized = normalize(response.data, [messagesEntity])
    console.log('response in thunk: ', normalized);
    
    return response.data;
  });
  
  const initialState = messagesAdapter.getInitialState({
    status: 'idle',
    error: null,
  })
  
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
        messagesAdapter.upsertMany(state, action.payload)
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
  
  export const {
    selectAll: selectAllMessages,
    selectById: selectMessagesById,
    selectIds: selectMessageIds,
  } = messagesAdapter.getSelectors((state) => state.messages)
  
  export const selectMessagesByUserId = createSelector(
    [selectAllMessages, (state, userId) => userId],
    (messages, userId) =>
      messages.filter((message) => message.sender_id === userId || message.receiver_id === userId)
  )