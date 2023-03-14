import UsersListPage from '../pages/users'
import { SinglePostPage } from '../features/posts/components/SinglePostPage'
import { EditPostForm } from '../features/posts/components/EditPostForm/EditPostForm'
import UserPage from '../pages/profile'
import LoginPage from '../pages/login'
import ExperiencesPage from '../pages/experiences'
import MessagesPage from '../pages/messages'
import PostsPage from '../pages/posts'
import { fetchSkills } from './reducers/dbSkillsSlice.js'
import { fetchPosts } from './features/posts/reducers/postsSlice.js'
import { fetchUsers } from './reducers/usersSlice.js'
import { fetchComments } from './reducers/commentsSlice.js'
import { fetchUserSkills } from './reducers/userSkillsSlice'
import {
  fetchExperiences
} from './reducers/experiencesSlice.js'
import { fetchConversations } from './reducers'

const routes = [
  {
    path: '/dashboard',
    component: PostsPage,
    isPrivate: true
    loader: 
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
    component: UsersListPage,
    isPrivate: true
  },
  {
    path: '/:userId/experiences',
    component: ExperiencesPage,
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
