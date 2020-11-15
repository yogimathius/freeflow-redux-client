import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import axios from 'axios';

const url = 'http://localhost:8000/api/postings/:id'

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
})

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchPosts = createAsyncThunk('postings/fetchPosts', async () => {
  const response = await axios.get('http://localhost:8000/api/postings');
  return response.data
})

export const addNewPost = createAsyncThunk(
  'postings/addNewPost',
  async (initialPost) => {
    // const newPost = {
    //   ...initialPost, is_request: false
    // }
    const { title, content, is_request, owner_id} = initialPost
    console.log("initial post in addnewpost: ", initialPost);
    const response = await axios.post(url, {posting: title, content, is_request, owner_id});
    console.log("response in thunk: ", response);
    return response.post
  }
)

const postsSlice = createSlice({
  name: 'postings',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.entities[postId]
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.entities[id]
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      postsAdapter.upsertMany(state, action.payload)
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewPost.fulfilled]: postsAdapter.addOne,
  },
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts)

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (state, userId) => {
    console.log("state in filter: ", state, "userId", userId);
   state.filter((posting) => posting.owner_id === userId)
  }
)

// export const selectPostsByUser = createSelector(
//   [selectAllPosts, (state, userId) => userId],
//   (posts, userId) => posts.filter((post) => post.user === userId)
// )
