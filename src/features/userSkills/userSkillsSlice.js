
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit'
import axios from 'axios';

const url = 'https://freeflow-two-point-o.herokuapp.com/api/user_skills'

const userSkillsAdapter = createEntityAdapter({
	selectId: (userSkill) => userSkill.id
})

const initialState = userSkillsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchUserSkills = createAsyncThunk('skills/fetchUserSkills', async () => {
	const response = await axios.get(url);
  return response.data
})

export const addNewUserSkill = createAsyncThunk(
  'userSkills/addNewUserSkill',
  async (initialUserSkills) => {
    const {name} = initialUserSkills
    const response = await axios.post(url, {name});
    return response.data
  }
)


export const removeUserSkill = createAsyncThunk(
  'userSkills/removeUserSkill',
  async (initialUserSkills) => {
    const { post_id, skill_id} = initialUserSkills
    const removeUserSkill = {
      post_id: post_id,
      skill_id: skill_id,
    };
    const response = await axios.delete(url, { 
      params: { 
        removeUserSkill
      }
    });
    return response.post
  }
)

const userSkillsSlice = createSlice({
  name: 'userSkills',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchUserSkills.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchUserSkills.fulfilled]: (state, action) => {
      state.status = 'succeeded'
			// Add any fetched skills to the array
      userSkillsAdapter.upsertMany(state, action.payload)
    },
    [fetchUserSkills.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewUserSkill.fulfilled]: (state, action) => {
      userSkillsAdapter.upsertOne(state, action.payload)
    },
    [removeUserSkill.fulfilled]: (state, action) => {
      userSkillsAdapter.removeOne(state, action.payload)
    } 
  },
})

export const { userSkillAdded } = userSkillsSlice.actions

export default userSkillsSlice.reducer

export const {
  selectAll: selectAllUserSkills,
  selectById: selectUserSkillById,
  selectIds: selectUserSkillIds,
} = userSkillsAdapter.getSelectors((state) => state.userSkills)

export const selectUserSkillsByPostId = createSelector(
  [selectAllUserSkills, (state, userId) => userId],
  (userSkills, userId) => userSkills.filter((userSkill) => userSkill.user_id === userId )
)