import { PostsList } from '../features/posts/PostsList';
import { UserProfile } from '../features/users/UserProfile';
import { UsersList } from '../features/users/UsersList';
import { SinglePostPage } from '../features/posts/SinglePostPage'
import { EditPostForm } from '../features/posts/EditPostForm';
import UserPage from '../features/users/UserPage';
import LoginPage from '../features/login/LoginPage';

const routes = [
  {
    path: '/dashboard',
    component: PostsList,
    isPrivate: true,
  },
  {
    path: '/login',
    component: LoginPage,
    isPrivate: false,
  },
  {
    path: '/posts/:postId',
    component: SinglePostPage,
    isPrivate: true,
  },
  {
    path: '/editPost/:postId',
    component: EditPostForm,
    isPrivate: true,
  },
  {
    path: '/users',
    component: UsersList,
    isPrivate: true,
  },
  {
    path: '/userprofile/:userId',
    component: UserPage,
    isPrivate: true,
  },
  {
    path: '/',
    component: LoginPage,
    isPrivate: false
  }
];

export default routes;
