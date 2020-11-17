import { configureStore } from '@reduxjs/toolkit'


import postsReducer from '../features/posts/postsSlice'
import usersReducer from '../features/users/usersSlice'
// import notificationsReducer from '../features/notifications/notificationsSlice'
import likesReducer from '../features/posts/likes/likesSlice'

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    likes: likesReducer
    // notifications: notificationsReducer,
  },
})
