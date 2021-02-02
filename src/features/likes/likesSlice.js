import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import axios from 'axios';

const url = 'https://freeflow-two-point-o.herokuapp.com/api/likes'

const likesAdapter = createEntityAdapter({
	selectId: (like) => like.id
})

const initialState = likesAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchLikes = createAsyncThunk('likes/fetchLikes', async () => {
  const response = await axios.get('https://freeflow-two-point-o.herokuapp.com/api/likes');
  return response.data
})

export const addNewLike = createAsyncThunk(
  'likes/addNewLike',
  async (initialLikes) => {
    const { post_id, liker_id} = initialLikes
    const response = await axios.post(url, {post_id, liker_id});
    return response.data
  }
)


export const removeLike = createAsyncThunk(
  'likes/removeLike',
  async (initialLikes) => {
    const { post_id, liker_id, id} = initialLikes
    const removeLike = {
      post_id,
      liker_id,
      id
    };
    const response = await axios.delete(url, { 
      params: { 
        removeLike
      }
    });
    return response.post
  }
)

const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { likeId, reaction } = action.payload
      const existingLike = state.entities[likeId]
      if (existingLike) {
        existingLike.reactions[reaction]++
      }
    },
  },
  extraReducers: {
    [fetchLikes.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchLikes.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched likes to the array
      likesAdapter.upsertMany(state, action.payload)
    },
    [fetchLikes.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewLike.fulfilled]: (state, action) => {
      likesAdapter.upsertOne(state, action.payload)
    },
    [removeLike.fulfilled]: (state, action) => {
      console.log("payload: ", action.meta.arg);
      likesAdapter.removeOne(state, action.meta.arg.id)
    } 
  },
})

export const { likeAdded } = likesSlice.actions

export default likesSlice.reducer

export const {
  selectAll: selectAlllikes,
  selectById: selectLikeById,
  selectIds: selectLikeIds,
} = likesAdapter.getSelectors((state) => state.likes)

export const selectLikesByPostId = createSelector(
  [selectAlllikes, (state, postId) => postId],
  (likes, postId) => likes.filter((like) => like.post_id === postId )
)

export const selectLikesByUserId = createSelector(
  [selectAlllikes, (state, userId) => userId],
  (likes, userId) => likes.filter((like) => like.liker_id === userId )
)
