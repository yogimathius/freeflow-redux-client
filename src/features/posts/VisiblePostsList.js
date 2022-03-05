import { connect } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import PostsList from './PostsList'
import { VisibilityFilters } from '../../reducers/filtersSlice'
import { extractSinglePosts } from './utils/extractSinglePosts'

const selectPosts = (state) => state.posts
const selectSkills = (state) => state.skills
const selectFilter = (state) => state.visibilityFilters

const selectVisiblePosts = createSelector(
  [selectPosts, selectSkills, selectFilter],
  (posts, skills, filter) => {
    const { postArr } = extractSinglePosts(posts, skills)
    const sortedArr = [...postArr].sort((a, b) => new Date(b.time_posted) - new Date(a.time_posted))
    for (const skill in VisibilityFilters) {
      const filteredSkill = VisibilityFilters[skill]
      if (filter === 'All') {
        return sortedArr
      }
      if (filter === filteredSkill) {
        return sortedArr.filter((post) => {
          return post.skills.includes(filteredSkill)
        })
      }
    }
    throw new Error('Unknown filter: ' + filter)
  }
)

const mapStateToProps = (state) => ({
  posts: selectVisiblePosts(state)
})

export const VisiblePostsList = connect(mapStateToProps)(PostsList)
