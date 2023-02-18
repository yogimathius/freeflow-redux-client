import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
  // createSelector,
} from '@reduxjs/toolkit'
import axios from 'axios'

const url = '/api/messages'

export const fetchUnreadCount = createAsyncThunk('messages/fetchMessages', async (userId) => {
  const response = await axios.get(`${url}/unread_count`, { userID: userId })
  return response.data
})

const initialState = {
  status: 'idle',
  error: null
}

const unreadCountSlice = createSlice({
  name: 'unreadCount',
  initialState,
  reducers: {
    // messageUpdated (state, action) {
    //   const { id, content } = action.payload
    //   const existingPost = state.entities[id]
    //   if (existingPost) {
    //     existingPost.content = content
    //   }
    // }
  },
  extraReducers: {
    [fetchUnreadCount.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchUnreadCount.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.unreadCount = action.payload
    },
    [fetchUnreadCount.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }

    // [removeMessage.fulfilled]: (state, action) => {
    //   unreadCountAdapter.removeOne(state, action.meta.arg.messageId)
    // }
    // [updateMessage.fulfilled]:(state, action) => {
    //   // const { id, ...changes } = payload;
    //   unreadCountAdapter.upsertOne(state, action.meta.arg)
    // }
  }
})

// export const { messageAdded, messageUpdated } = unreadCountSlice.actions

export default unreadCountSlice.reducer

export const selectAllMessages = state => state.unreadCount
