import { configureStore } from '@reduxjs/toolkit'

import postsReducer from '../features/posts/postsSlice'
import usersReducer from '../features/users/usersSlice'
import likesReducer from '../features/posts/likes/likesSlice'
import commentsReducer from '../features/comments/commentsSlice';
// import notificationsReducer from '../features/notifications/notificationsSlice'

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    likes: likesReducer,
    // notifications: notificationsReducer,
    comments: commentsReducer
  },
})
