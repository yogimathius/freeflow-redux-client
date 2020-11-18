import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';

// const initialState = commentsAdapter.getInitialState({
//   status: 'idle',
//   error: null,
// });

const url = `http://localhost:8000/api/comments`

const commentsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
})

export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
  const response = await axios.get(url);
  console.log(response.data)
  return response.data;
});

const initialState = commentsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const addNewComment = createAsyncThunk(
  'postings/addNewPost',
  async (initialComment) => {
    const {
      commenter_id,
      posting_id,
      content,
    } = initialComment
    // console.log('initial comment in addNewComment: ', initialComment)
    const response = await axios.post(`${url}/${posting_id}`, {
      commenter_id,
      posting_id,
      content,
    })
    console.log('response in Comments thunk: ', response.data)
    return response.data
  }
)

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    // reactionAdded(state, action) {
    //   const { postId, reaction } = action.payload
    //   const existingPost = state.entities[postId]
    //   if (existingPost) {
    //     existingPost.reactions[reaction]++
    //   }
    // },
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
  },
});

export const { commentAdded, commentUpdated } = commentsSlice.actions;

export default commentsSlice.reducer;

export const {
  selectAll: selectAllComments,
  selectByPostId: selectCommentsById,
  selectIds: selectCommentIds,
} = commentsAdapter.getSelectors((state) => state.comments)

export const selectCommentsByPostId = createSelector(
  [selectAllComments, (state, postingId) => postingId],
  (comments, postingId) => comments.filter((comment) => comment.posting_id == postingId)
)