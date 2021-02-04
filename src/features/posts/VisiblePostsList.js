import { connect } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import PostsList from './PostsList'
import { VisibilityFilters } from '../filters/filtersSlice'

const selectPosts = (state) => state.posts
const selectPostSkills = (state) => state.postSkills
const selectFilter = (state) => state.visibilityFilters

const selectVisiblePosts = createSelector(
  [selectPosts, selectPostSkills, selectFilter],
  (posts, postsSkills, filter) => {
    const postKeys = Object.keys(posts.entities)
    let postSkillsKeys = Object.keys(postsSkills.entities)
    
    let postSkillsArr = []

    let postArr = []
    postKeys.forEach(postKey => {
      const singlePosts = JSON.parse(JSON.stringify(posts.entities[postKey]))

      
      singlePosts.skills = []
      postSkillsKeys.forEach(skillKey => {
        postSkillsArr.push(postsSkills.entities[skillKey])
        if (singlePosts.id === postsSkills.entities[skillKey].post_id) {
          singlePosts.skills.push(postsSkills.entities[skillKey].name)
        }})
      postArr.push(singlePosts)
    })
    const sortedArr = [...postArr].sort((a, b) => new Date(b.time_posted) - new Date (a.time_posted))
    for (const skill in VisibilityFilters) {
      const filteredSkill = VisibilityFilters[skill]
      if (filter === 'All') {
        return sortedArr
      }
      if (filter === filteredSkill) {
        
        return sortedArr.filter((post) => {
          return post.skills.includes(filteredSkill) })
      }
    }
    throw new Error('Unknown filter: ' + filter)
  }
)

const mapStateToProps = (state) => ({
  posts: selectVisiblePosts(state)
})

export const VisiblePostsList = connect(mapStateToProps)(PostsList)
