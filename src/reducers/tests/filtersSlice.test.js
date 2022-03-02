import visibilityFilters, { addVisibilityFilter } from '../filtersSlice'

describe('filtersSlice', () => {
  it('should handle initial state', () => {
    expect(visibilityFilters(undefined, {})).toEqual('All')
  })

  // describe('addVisibilityFilter', () => {
  it('should generate incrementing visibilityFilter IDs', () => {
    const action1 = addVisibilityFilter({ JAVASCRIPT: 'JavaScript' })
    const action2 = addVisibilityFilter({ RUBY: 'Ruby' })

    expect(action1.payload).toEqual({ JAVASCRIPT: 'JavaScript' })
    expect(action2.payload).toEqual({ RUBY: 'Ruby' })
  })
  // })
})
