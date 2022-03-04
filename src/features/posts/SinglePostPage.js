/* eslint-disable react/prop-types */
import React from 'react'
import { useSelector } from 'react-redux'
import { CommentsList } from '../comments/CommentsList'
import { selectPostById } from './reducers/postsSlice'
import { AddCommentForm } from '../comments/AddCommentForm'
import PostExcerpt from './components/PostExcerpt/PostExcerpt'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export const SinglePostPage = ({ match }) => {
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
    <section className="my-12">
      <Link className="" to='/dashboard'>
        <FontAwesomeIcon
        className=""
        icon={faTimes} size="1x" />
      </Link>
      <PostExcerpt onPost={true} postId={postId} />
      <CommentsList postId={postId} />
      <AddCommentForm postId={postId} />
    </section>
  )
}
