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
    // console.log("posts in visible: ", posts);
    const postKeys = Object.keys(posts.entities)
    let postSkillsKeys = Object.keys(postsSkills.entities)
    // console.log("post skills: ", postSkills, posts.entities, postKeys);
    
    let postSkillsArr = []
    // const postSkills = post

    const postArr = []
    postKeys.forEach(postKey => {
      const singlePosts = JSON.parse(JSON.stringify(posts.entities[postKey]))

      
      singlePosts.skills = []
      postSkillsKeys.forEach(skillKey => {
        postSkillsArr.push(postsSkills.entities[skillKey])
        // console.log(postsSkills.entities[skillKey].post_id);
        if (singlePosts.id === postsSkills.entities[skillKey].post_id) {
          // console.log("match: ", postKey, postsSkills.entities[skillKey])
          singlePosts.skills.push(postsSkills.entities[skillKey].name)
        }})
      postArr.push(singlePosts)
    })

    console.log(postArr);
    for (const skill in VisibilityFilters) {
      const filteredSkill = VisibilityFilters[skill]
      if (filter === 'All') {
        return postArr
      }
      if (filter === filteredSkill) {
        
        return postArr.filter((post) => {
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
