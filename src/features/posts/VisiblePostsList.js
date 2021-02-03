import { connect } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import PostsList from './PostsList'
import { VisibilityFilters } from '../filters/filtersSlice'

const selectPosts = (state) => state.posts
const selectFilter = (state) => state.visibilityFilters

const selectVisiblePosts = createSelector(
  [selectPosts, selectFilter],
  (state, filter) => {
    if (state.posts === undefined || state.posts === null) {
      return null;
    }

    const postKeys = Object.keys(state.posts.entities)
    console.log("keys: ", postKeys);
    const postArr = []
    postKeys.forEach(key => {
      postArr.push(state.posts.entities[key])
    })
    console.log(postArr);

    for (const language in VisibilityFilters) {
      console.log(VisibilityFilters);
      const filteredLang = VisibilityFilters[language]
      console.log("filtered language: ", filteredLang);
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
