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
    console.log("posts in visible: ", posts);
    const postKeys = Object.keys(posts.entities)
    let postSkills = postsSkills.entities
    // console.log("post skills: ", postSkills);

    for (const postSkillKey in postSkills) {
      if (Object.hasOwnProperty.call(postSkills, postSkillKey)) {
        const element = postSkills[postSkillKey];
        console.log("post skill: ", element);
      }
    }
    const postArr = []
    postKeys.forEach(key => {
      postArr.push(posts.entities[key])
    })

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
