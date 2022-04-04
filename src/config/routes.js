import { UsersList } from '../features/users/UsersList'
import { SinglePostPage } from '../features/posts/components/SinglePostPage'
import { EditPostForm } from '../features/posts/components/EditPostForm/EditPostForm'
import UserPage from '../pages/profile'
import LoginPage from '../features/login/LoginPage'
import UserExperiences from '../features/experiences/UserExperiences'
import MessagesPage from '../pages/messages'
import PostsPage from '../pages/posts'

const routes = [
  {
    path: '/dashboard',
    component: PostsPage,
    isPrivate: true
  },
  {
    path: '/login',
    component: LoginPage,
    isPrivate: false
  },
  {
    path: '/posts/:postId',
    component: SinglePostPage,
    isPrivate: true
  },
  {
    path: '/messages',
    component: MessagesPage,
    isPrivate: true
  },
  {
    path: '/editPost/:postId',
    component: EditPostForm,
    isPrivate: true
  },
  {
    path: '/users',
    component: UsersList,
    isPrivate: true
  },
  {
    path: '/:userId/experiences',
    component: UserExperiences,
    isPrivate: true
  },
  {
    path: '/userprofile/:userId',
    component: UserPage,
    isPrivate: true
  },
  {
    path: '/',
    component: LoginPage,
    isPrivate: false
  }
]

export default routes
