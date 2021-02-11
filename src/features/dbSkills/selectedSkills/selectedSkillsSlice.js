import {
  createSlice,
} from '@reduxjs/toolkit'


const initialState = ([])

export let selectedSkills;

const selectedSkillsSlice = createSlice({
  name: 'selectedSkills',
  initialState: initialState,
  reducers: {
    setSelectedSkills(state, action) {
      console.log("action: ", action.payload);
      selectedSkills = action.payload.options
      return action.payload
    },
    addSelectedSkill(state, action) {
      console.log("action: ", action);
      selectedSkills.push()
      return state
    }
  },
  extraReducers: {
  }
})

export const { setSelectedSkills, addSelectedSkill } = selectedSkillsSlice.actions

export default selectedSkillsSlice.reducer
