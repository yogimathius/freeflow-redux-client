import { connect } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import PostsList from './PostsList'
import { VisibilityFilters } from '../filters/filtersSlice'

const selectPosts = (state) => state.posts
const selectFilter = (state) => state.visibilityFilter

const selectVisiblePosts = createSelector(
  [selectPosts, selectFilter],
  (state, filter) => {
    console.log("posts: ", state);
    if (state.posts === undefined || state.posts === null) {
      return null;
    }
    const postKeys = Object.keys(state.posts.entities)
    const postArr = []
    postKeys.forEach(key => {
      postArr.push(state.posts.entities[key])
    })

    for (const language in VisibilityFilters) {
      const filteredLang = VisibilityFilters[language]
      console.log(filteredLang);
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
