import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter
} from '@reduxjs/toolkit'
import axiosInstance from '../axiosInstance'

const url = '/api/experiences'

const experiencesAdapter = createEntityAdapter({
  selectId: (experience) => experience.id
})

const initialState = experiencesAdapter.getInitialState({
  status: 'idle',
  error: null
})

export const fetchExperiences = createAsyncThunk('experiences/fetchExperiences', async () => {
  const response = await axiosInstance.get(url)
  return response.data
})

export const getExperienceCountByUser = createAsyncThunk('experiences/getExperienceCount', async () => {
  const response = await axiosInstance.get('/api/experiences/user')
  return response.data
})

export const addNewExperience = createAsyncThunk(
  'experiences/addNewExperience',
  async (initialExperiences) => {
    const { helper_id, helped_id, creator_id } = initialExperiences

    const response = await axiosInstance.post(`${url}/new`, { helper_id, helped_id, creator_id })
    return response.data
  }
)

export const acceptExperience = createAsyncThunk(
  'experiences/acceptExperience',
  async (initialExperiences) => {
    const { id } = initialExperiences

    const experienceId = id
    const response = await axiosInstance.put(`${url}/accept`, { experienceId })
    return response.data
  }
)

export const completeExperience = createAsyncThunk(
  'experiences/completeExperience',
  async (initialExperiences) => {
    const { id } = initialExperiences
    const experienceId = id

    const response = await axiosInstance.put(`${url}/complete`, { experienceId })

    return response.data
  }
)

export const removeExperience = createAsyncThunk(
  'experiences/removeExperience',
  async (initialExperiences) => {
    const { id } = initialExperiences

    const experienceId = id
    const response = await axiosInstance.delete(`${url}/delete`, {
      params: { experienceId }
    })
    return response.data
  }
)

const experiencesSlice = createSlice({
  name: 'experiences',
  initialState,
  reducers: {
    reactionAdded (state, action) {
      const { experienceId, reaction } = action.payload
      const existingExperience = state.entities[experienceId]
      if (existingExperience) {
        existingExperience.reactions[reaction]++
      }
    }
  },
  extraReducers: {
    [fetchExperiences.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchExperiences.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      experiencesAdapter.upsertMany(state, action.payload)
    },
    [fetchExperiences.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewExperience.fulfilled]: experiencesAdapter.addOne,
    [acceptExperience.fulfilled]: (state, action) => {
      experiencesAdapter.upsertOne(state, action.payload)
    },
    [completeExperience.fulfilled]: (state, action) => {
      experiencesAdapter.upsertOne(state, action.payload)
    },
    [removeExperience.fulfilled]: (state, action) => {
      experiencesAdapter.removeOne(state, action.meta.arg.id)
    }
  }
})

export const { experienceAdded } = experiencesSlice.actions

export default experiencesSlice.reducer

export const {
  selectAll: selectAllExperiences,
  selectById: selectExperienceById,
  selectIds: selectExperienceIds
} = experiencesAdapter.getSelectors((state) => {
  return state.experiences
}
)

export const selectHelperExperiencesByUserId = createSelector(
  [selectAllExperiences, (state, userId) => userId],
  (experiences, userId) => experiences.filter((experience) => {
    return experience.helper_id === parseInt(userId)
  })
)

export const selectHelpedExperiencesByUserId = createSelector(
  [selectAllExperiences, (state, userId) => userId],
  (experiences, userId) => experiences.filter((experience) => {
    return experience.helped_id === parseInt(userId)
  })
)

export const selectCompletedExperiencesByHelperId = createSelector(
  [selectAllExperiences, (state, userId) => userId],
  (experiences, userId) => experiences.filter((experience) => {
    return experience.helper_id === parseInt(userId) && experience.status === 'completed'
  })
)
