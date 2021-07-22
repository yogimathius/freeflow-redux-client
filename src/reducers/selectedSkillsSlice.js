import {
  createSlice
} from '@reduxjs/toolkit'

const initialState = ([])

export let selectedSkillsDB = {
  '': ''
}

const selectedSkillsSlice = createSlice({
  name: 'selectedSkillsDB',
  initialState: initialState,
  reducers: {
    setSelectedSkills (state, action) {
      console.log('action: ', action)
      selectedSkillsDB = action.payload.options[0]
      return action.payload
    },
    emptySkillsDB (state, action) {
      selectedSkillsDB = null
      return selectedSkillsDB
    }
  },
  extraReducers: {
  }
})

export const { setSelectedSkills, addSelectedSkill, emptySkillsDB } = selectedSkillsSlice.actions

export default selectedSkillsSlice.reducer
