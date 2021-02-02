import { connect } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import PostsList from './PostsList'
import { VisibilityFilters } from '../filters/filtersSlice'

const selectPosts = (state) => state
const selectFilter = (state) => state.visibilityFilter

const selectVisiblePosts = createSelector(
  [selectPosts, selectFilter],
  (posts, filter) => {
    console.log(posts);
    const postKeys = Object.keys(posts.posts.entities)
    const postArr = []
    postKeys.forEach(key => {
      postArr.push(posts.posts.entities[key])
    })

    for (const language in VisibilityFilters) {
      const filteredLang = VisibilityFilters[language]
      if (filter === 'SHOW_ALL') {
        return postArr
      }
      if (filter === filteredLang) {
        return postArr.filter((post) => post.language === filteredLang)
      }
    }
    throw new Error('Unknown filter: ' + filter)
  }
)

const mapStateToProps = (state) => ({
  posts: selectVisiblePosts(state)
})

export const VisiblePostsList = connect(mapStateToProps)(PostsList)
