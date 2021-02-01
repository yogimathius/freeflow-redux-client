import React from 'react'
import { useSelector } from 'react-redux'
import { CommentsList } from '../comments/CommentsList'
import { selectPostById } from './postsSlice'
import { AddCommentForm } from '../comments/AddCommentForm'
import PostExcerpt from './PostExcerpt'

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
    <section>
      <PostExcerpt onPost={true} postId={postId} />
      <CommentsList postId={postId} />
      <AddCommentForm postId={postId} />
    </section>
  )
}
