import { connect } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import PostsList from './PostsList'
import { VisibilityFilters } from '../filters/filtersSlice'

const selectPosts = (state) => state.posts
const selectSkills = (state) => state.skills
const selectFilter = (state) => state.visibilityFilters

const selectVisiblePosts = createSelector(
  [selectPosts, selectSkills, selectFilter],
  (posts, skills, filter) => {
    const postKeys = Object.keys(posts.entities)
    const skillKeys = Object.keys(skills.entities)

    const postSkillsArr = []

    const postArr = []
    postKeys.forEach(postKey => {
      const singlePosts = JSON.parse(JSON.stringify(posts.entities[postKey]))

      singlePosts.skills = []
      skillKeys.forEach(skillKey => {
        postSkillsArr.push(skills.entities[skillKey])
        if (singlePosts.skill_ids.includes(skills.entities[skillKey].id)) {
          singlePosts.skills.push(skills.entities[skillKey].name)
        }
      })
      postArr.push(singlePosts)
    })
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
