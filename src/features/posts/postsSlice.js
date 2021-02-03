import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import axios from 'axios';

const url = 'http://localhost:8080/api/posts'


const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.time_posted.localeCompare(a.time_posted),
})

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(url);
  return response.data
})

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost) => {
    const { text_body, is_helper, is_helped, active, owner_id, avatar, username, id} = initialPost

    const newPost = { 
      text_body, 
      is_helper, 
      is_helped, 
      active, 
      time_posted: new Date().toISOString(),
      avatar,
      owner_id,
      username,
      id
    }

    const response = await axios.post(url, newPost);
    return response.data
  }
)

export const removePost = createAsyncThunk(
  'posts/removePost',
  async (initialPost) => {
    const { post_id } = initialPost

    const response = await axios.delete(url, {
      params: {
        post_id
      }
    });
    return response.data
  }
)

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (initialPost) => {
    const { text_body, post_id } = initialPost

    const response = await axios.put(url, { text_body,
    post_id });
    return response.data
  }
)
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
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
    [removePost.fulfilled]: (state, action) => {
      postsAdapter.removeOne(state, action.meta.arg.post_id)
    },
    // [updatePost.fulfilled]:(state, action) => {
    //   postsAdapter.updateOne(state, action.meta.arg.post_id)
    // }
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
  (posts, userId) => posts.filter((post) => { 
    return post.owner_id === userId
  })
)
