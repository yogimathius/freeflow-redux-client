import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import store from '../../app/store'
import { CommentsList } from '../comments/CommentsList'
import { selectPostById } from './postsSlice'
import { fetchComments } from '../comments/commentsSlice'
import { AddCommentForm } from '../comments/AddCommentForm'

import './SinglePostPage.scss'
import { selectUserById } from '../users/usersSlice'
import PostExcerpt from './PostExcerpt'

store.dispatch(fetchComments())

export const SinglePostPage = ({ match }) => {
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
	const userId = loggedInUser.id;
  const user = useSelector((state) => selectUserById(state, userId));

  const { postId } = match.params

  const post = useSelector((state) => selectPostById(state, postId))

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <PostExcerpt onPost={true} postId={postId} />
      <CommentsList postId={postId} />
      <AddCommentForm postId={postId} />
    </section>
  )
}
