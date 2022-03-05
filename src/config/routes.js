import { VisiblePostsList } from '../features/posts'
import { UsersList } from '../features/users/UsersList'
import { SinglePostPage } from '../features/posts/components/SinglePostPage'
import { EditPostForm } from '../features/posts/components/EditPostForm/EditPostForm'
import UserPage from '../features/users/UserPage'
import LoginPage from '../features/login/LoginPage'
import UserExperiences from '../features/experiences/UserExperiences'
import MessagesPage from '../pages/messages/index'

const routes = [
  {
    path: '/dashboard',
    component: VisiblePostsList,
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
