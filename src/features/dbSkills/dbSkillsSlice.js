
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit'
import axios from 'axios';

const url = 'https://freeflow-two-point-o.herokuapp.com/api/db_skills'

const skillsAdapater = createEntityAdapter({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

const initialState = skillsAdapater.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchSkills = createAsyncThunk('skills/fetchSkills', async () => {
  const response = await axios.get(url);
  return response.data
})

export const addNewSkill = createAsyncThunk(
  'skills/addNewLike',
  async (intitialSkills) => {
    const {name} = intitialSkills
    const response = await axios.post(url, {name});
    return response.data
  }
)


export const removeSkill = createAsyncThunk(
  'skills/removeSkill',
  async (intitialSkills) => {
    const { post_id, skill_id} = intitialSkills
    const removeSkill = {
      post_id: post_id,
      skill_id: skill_id,
    };
    const response = await axios.delete(url, { 
      params: { 
        removeSkill
      }
    });
    return response.post
  }
)

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { skillId, reaction } = action.payload
      const existingSkill = state.entities[skillId]
      if (existingSkill) {
        existingSkill.reactions[reaction]++
      }
    },
  },
  extraReducers: {
    [fetchSkills.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchSkills.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched skills to the array
      skillsAdapater.upsertMany(state, action.payload)
    },
    [fetchSkills.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewSkill.fulfilled]: (state, action) => {
      skillsAdapater.upsertOne(state, action.payload)
    },
    [removeSkill.fulfilled]: (state, action) => {
      skillsAdapater.removeOne(state, action.payload)
    } 
  },
})

export const { skillAdded } = skillsSlice.actions

export default skillsSlice.reducer

export const {
  selectAll: selectAllskills,
  selectById: selectSkillById,
  selectIds: selectSkillIds,
} = skillsAdapater.getSelectors((state) => state.skills)

export const selectSkillsByIds = createSelector(
  [selectAllskills, (state, skillIds) => skillIds],
  (skills, skillIds) => {
    
    let filteredSkills = []
    // eslint-disable-next-line array-callback-return
    skills.filter((skill) => { 
    skillIds.forEach(skillId => {
      if (skill.id === skillId) {
        filteredSkills.push(skill.name)
      }
      // console.log(filteredSkills);
    });
  })
  // console.log(filteredSkills);
  return filteredSkills;
}
)