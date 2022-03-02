import {
  createSlice
} from '@reduxjs/toolkit'

const initialState = ([])

export let selectedSkillsDB = []

const selectedSkillsSlice = createSlice({
  name: 'selectedSkillsDB',
  initialState: initialState,
  reducers: {
    setSelectedSkills (state, action) {
      selectedSkillsDB = action.payload.optionIds
      return action.payload
    },
    emptySkillsDB (state, action) {
      selectedSkillsDB = null
      return selectedSkillsDB
    },
    addSelectedSkill (state, action) {
      selectedSkillsDB.push(action.payload.optionIds)
    }
  },
  extraReducers: {
  }
})

export const { setSelectedSkills, addSelectedSkill, emptySkillsDB } = selectedSkillsSlice.actions

export default selectedSkillsSlice.reducer
