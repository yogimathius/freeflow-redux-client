import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';

const url = `https://freeflow-two-point-o.herokuapp.com/api/comments`

const commentsAdapter = createEntityAdapter({
	selectId: (comment) => comment.id,
})

export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
  const response = await axios.get(url);
  return response.data;
});

const initialState = commentsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const addNewComment = createAsyncThunk(
  'comments/addNewComment',
  async (initialComment) => {
    const {
      commenter_id,
      post_id,
      content,
    } = initialComment
    console.log(initialComment);
    const response = await axios.post(`${url}`, {
      commenter_id,
      post_id,
      text_body: content,
    })
    return response.data
  }
)

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async (initialComments) => {
    const { post_id, commenter_id} = initialComments
    const removeComment = {
      post_id: post_id,
      commenter_id: commenter_id,
    };
    const response = await axios.delete(url, { 
      params: { 
        removeComment
      }
    });
    console.log("response in remove comment thunk: ", response.post);
    return response.post
  }
)

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    commentUpdated(state, action) {
      const { id, content } = action.payload
      const existingPost = state.entities[id]
      if (existingPost) {
        existingPost.content = content
      }
    },
  },
  extraReducers: {
    [fetchComments.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      commentsAdapter.upsertMany(state, action.payload)
    },
    [fetchComments.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewComment.fulfilled]: commentsAdapter.addOne,
    [removeComment.fulfilled]: (state, action) => {
      commentsAdapter.removeOne(state, action.payload)
    } 
  },
});

export const { commentAdded, commentUpdated } = commentsSlice.actions;

export default commentsSlice.reducer;

export const {
  selectAll: selectAllComments,
  selectById: selectCommentsById,
  selectIds: selectCommentIds,
} = commentsAdapter.getSelectors((state) => state.comments)

export const selectCommentsByPostId = createSelector(
  [selectAllComments, (state, postId) => postId],
  (comments, postId) =>
    comments.filter((comment) => comment.post_id === postId)
)