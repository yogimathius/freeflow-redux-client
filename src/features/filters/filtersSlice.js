import {
  createSlice,
} from '@reduxjs/toolkit'

export const VisibilityFilters = {
  All: 'Show All'
}

const filtersSlice = createSlice({
  name: 'visibilityFilters',
  initialState: VisibilityFilters.All,
  reducers: {
    setVisibilityFilter(state, action) {
      return action.payload
    },
    addVisibilityFilter(state, action) {
      const type = action.payload.name
      const filter = action.payload.name

      VisibilityFilters[type] = filter
      return state
    }
  }
})

export const { setVisibilityFilter, addVisibilityFilter } = filtersSlice.actions

export default filtersSlice.reducer
