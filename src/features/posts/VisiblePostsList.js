import { connect } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import PostsList from './PostsList'
import { VisibilityFilters } from '../filters/filtersSlice'

const selectPosts = (state) => state.posts
const selectFilter = (state) => state.visibilityFilters

const selectVisiblePosts = createSelector(
  [selectPosts, selectFilter],
  (state, filter) => {
    const postKeys = Object.keys(state.entities)

    const postArr = []
    postKeys.forEach(key => {
      postArr.push(state.entities[key])
    })
    console.log("post arr: ", postArr);

    for (const skill in VisibilityFilters) {
      const filteredSkill = VisibilityFilters[skill]
      console.log("skill: ", filteredSkill, filter);
      if (filter === 'All') {
        console.log("filter is all ", postArr);
        return postArr
      }
      if (filter === filteredSkill) {
        console.log(filter, ' = ', filteredSkill);
        return postArr.filter((post) => {
          console.log(post);
          return post.name === filteredSkill })
      }
    }
    throw new Error('Unknown filter: ' + filter)
  }
)

const mapStateToProps = (state) => ({
  posts: selectVisiblePosts(state)
})

export const VisiblePostsList = connect(mapStateToProps)(PostsList)
