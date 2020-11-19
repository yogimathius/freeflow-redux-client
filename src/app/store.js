import { configureStore } from '@reduxjs/toolkit'

import postsReducer from '../features/posts/postsSlice'
import usersReducer from '../features/users/usersSlice'
import likesReducer from '../features/likes/likesSlice'
import commentsReducer from '../features/comments/commentsSlice';
import karmasReducer from '../features/karmas/karmasSlice';

// import notificationsReducer from '../features/notifications/notificationsSlice'

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    likes: likesReducer,
    // notifications: notificationsReducer,
    comments: commentsReducer,
    karmas: karmasReducer

  },
})
