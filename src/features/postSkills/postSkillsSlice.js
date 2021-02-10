
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit'
import axios from 'axios';

const url = 'https://freeflow-two-point-o.herokuapp.com/api/posts_skills'

const postsSkillsAdapter = createEntityAdapter({
	selectId: (postsSkill) => postsSkill.id
})

const initialState = postsSkillsAdapter.getInitialState({
  status: 'idle',
  error: null,
  addPostSkill: false
})

export const fetchPostSkills = createAsyncThunk('posts/fetchPostSkills', async () => {
	const response = await axios.get('https://freeflow-two-point-o.herokuapp.com/api/posts_skills');
  return response.data
})

// export const addNewPostSkill = createAsyncThunk(
//   'postsSkills/addNewPostSkill',
//   async (initialPostSkills) => {
//     const {name} = initialPostSkills
//     const response = await axios.post(url, {name});
//     return response.data
//   }
// )

export const addPostSkills = createAsyncThunk(
  'postSkills/addPostSkills',
  async (initialPostSkills) => {
    const {post_id, db_skills_id} = initialPostSkills
    console.log("initial post skills: ", initialPostSkills);
    const response = await axios.post(url, {post_id, db_skills_id});
    return response.data
  }
)


export const removePostSkill = createAsyncThunk(
  'postsSkills/removePostSkill',
  async (initialPostSkills) => {
    const { post_id, skill_id} = initialPostSkills
    const removePostSkill = {
      post_id: post_id,
      skill_id: skill_id,
    };
    const response = await axios.delete(url, { 
      params: { 
        removePostSkill
      }
    });
    return response.post
  }
)

const postsSkillsSlice = createSlice({
  name: 'postsSkills',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchPostSkills.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchPostSkills.fulfilled]: (state, action) => {
      state.status = 'succeeded'
			// Add any fetched posts to the array
      postsSkillsAdapter.upsertMany(state, action.payload)
    },
    [fetchPostSkills.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addPostSkills.fulfilled]:
      postsSkillsAdapter.addOne,
    [removePostSkill.fulfilled]: (state, action) => {
      postsSkillsAdapter.removeOne(state, action.payload)
    } 
  },
})

export const { postsSkillAdded, addingPostSkill } = postsSkillsSlice.actions

export default postsSkillsSlice.reducer

export const {
  selectAll: selectAllPostSkills,
  selectById: selectPostSkillById,
  selectIds: selectPostSkillIds,
} = postsSkillsAdapter.getSelectors((state) => state.postSkills)

export const selectPostSkillsByPostId = createSelector(
  [selectAllPostSkills, (state, postId) => postId],
  (postSkills, postId) => postSkills.filter((postsSkill) => {
    return postsSkill.post_id === postId })
)