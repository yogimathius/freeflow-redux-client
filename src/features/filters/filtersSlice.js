import {
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'

const filtersAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.time_posted.localeCompare(a.time_posted),
})

const initialState = filtersAdapter.getInitialState({
  All: 'All',
})

export const VisibilityFilters = {
  All: 'All'
}

const filtersSlice = createSlice({
  name: 'visibilityFilters',
  initialState: initialState.All,
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
  },
  extraReducers: {
  }
})

export const { setVisibilityFilter, addVisibilityFilter } = filtersSlice.actions

export default filtersSlice.reducer
