
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector
} from '@reduxjs/toolkit'
import axios from 'axios'
import axiosInstance from '../axiosInstance'

const url = '/api/db_skills'

const skillsAdapter = createEntityAdapter()

export const fetchSkills = createAsyncThunk('skills/fetchSkills', async () => {
  const response = await axiosInstance.get(url)
  return response.data
})

const initialState = skillsAdapter.getInitialState({
  status: 'idle',
  error: null,
  selectedSkillsDB: []
})

export const addNewSkill = createAsyncThunk(
  'skills/addNewLike',
  async (intitialSkills) => {
    const { name } = intitialSkills
    const response = await axiosInstance.post(url, { name })
    return response.data
  }
)

export const removeSkill = createAsyncThunk(
  'skills/removeSkill',
  async (intitialSkills) => {
    const { post_id, skill_id } = intitialSkills
    const removeSkill = {
      post_id: post_id,
      skill_id: skill_id
    }
    const response = await axiosInstance.delete(url, {
      params: {
        removeSkill
      }
    })
    return response.post
  }
)

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    setSelectedSkills (state, action) {
      state.selectedSkillsDB = action.payload.optionIds
      return action.payload
    }
  },
  extraReducers: {
    [fetchSkills.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchSkills.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched skills to the array
      skillsAdapter.upsertMany(state, action.payload)
    },
    [fetchSkills.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewSkill.fulfilled]: (state, action) => {
      skillsAdapter.upsertOne(state, action.payload)
    },
    [removeSkill.fulfilled]: (state, action) => {
      skillsAdapter.removeOne(state, action.payload)
    }
  }
})

export const { skillAdded } = skillsSlice.actions

export default skillsSlice.reducer

export const {
  selectAll: selectAllskills,
  selectById: selectSkillById,
  selectIds: selectSkillIds
} = skillsAdapter.getSelectors((state) => state.skills)

export const selectSkillsByIds = createSelector(
  [selectAllskills, (state, skillIds) => skillIds],
  (skills, skillIds) => {
    const filteredSkills = []
    // eslint-disable-next-line array-callback-return
    skills.filter((skill) => {
      skillIds.forEach(skillId => {
        if (skill.id === skillId) {
          filteredSkills.push(skill.name)
        }
      })
    })
    return filteredSkills
  }
)

export const selectSkillsById = createSelector(
  [selectAllskills, (state, skillIds) => skillIds],
  (skills, skillId) => {
    return skills.filter((skill) => skill.id === skillId)
  }
)
