import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter
} from '@reduxjs/toolkit'
import axios from 'axios'
import axiosInstance from '../axiosInstance'

const url = '/api/comments'

const commentsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.time_posted.localeCompare(b.time_posted)
})

export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
  const response = await axiosInstance.get(url)
  return response.data
})

const initialState = commentsAdapter.getInitialState({
  status: 'idle',
  error: null
})

export const addNewComment = createAsyncThunk(
  'comments/addNewComment',
  async (initialComment) => {
    const {
      commenter_id,
      post_id,
      content
    } = initialComment
    const response = await axiosInstance.post(`${url}`, {
      commenter_id,
      post_id,
      text_body: content,
      time_posted: new Date().toISOString()
    })
    return response.data
  }
)

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async (initialComments) => {
    const { id, post_id, commenter_id } = initialComments
    const removeComment = {
      id,
      post_id: post_id,
      commenter_id: commenter_id
    }
    const response = await axiosInstance.delete(url, {
      params: {
        removeComment
      }
    })
    return response.post
  }
)

export const updateComment = createAsyncThunk(
  'comments/updatePost',
  async (initialPost) => {
    const { text_body, post_id, commenter_id } = initialPost
    const response = await axiosInstance.put(url, {
      text_body,
      post_id,
      commenter_id
    })
    return response.data
  }
)

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    commentUpdated (state, action) {
      const { id, content } = action.payload
      const existingPost = state.entities[id]
      if (existingPost) {
        existingPost.content = content
      }
    }
  },
  extraReducers: {
    [fetchComments.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      commentsAdapter.upsertMany(state, action.payload)
    },
    [fetchComments.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewComment.fulfilled]: commentsAdapter.addOne,
    [removeComment.fulfilled]: (state, action) => {
      commentsAdapter.removeOne(state, action.meta.arg.id)
    },
    [updateComment.fulfilled]: (state, action) => {
      // const { id, ...changes } = payload;
      commentsAdapter.upsertOne(state, action.meta.arg)
    }
  }
})

export const { commentAdded, commentUpdated } = commentsSlice.actions

export default commentsSlice.reducer

export const {
  selectAll: selectAllComments,
  selectById: selectCommentsById,
  selectIds: selectCommentIds
} = commentsAdapter.getSelectors((state) => state.comments)

export const selectCommentsByPostId = createSelector(
  [selectAllComments, (state, postId) => postId],
  (comments, postId) =>
    comments.filter((comment) => comment.post_id === postId)
)
