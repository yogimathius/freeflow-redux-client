import { PostsList } from '../features/posts/PostsList';
import { UserProfile } from '../features/users/UserProfile';
import { UsersList } from '../features/users/UsersList';
import { SinglePostPage } from '../features/posts/SinglePostPage'
import { EditPostForm } from '../features/posts/EditPostForm';
import { UserPage } from '../features/users/UserPage';
import LoginPage from '../features/login/LoginPage';
import { AddPostForm } from '../features/posts/AddPostForm';

const routes = [
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
    path: '/',
    component: PostsList,
    isPrivate: true,
  },
  {
    path: '/users',
    component: UsersList,
    isPrivate: true,
  },
  {
    path: '/profile',
    component: UserProfile,
    isPrivate: true,
  },
  {
    path: '/profile',
    component: UserPage,
    isPrivate: true,
  },
  // {
  //   path: '/messages',
  //   component: Messages,
  //   isPrivate: true,
  // },
  // {
  //   path: '/experiences',
  //   component: Experiences,
  //   isPrivate: true,
  // },
];

export default routes;
