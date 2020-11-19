import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import store from '../../app/store'

import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
// import { ReactionButtons } from './ReactionButtons'
import { CommentsList } from '../comments/CommentsList'
import { selectPostById } from './postsSlice'
import { fetchComments } from '../comments/commentsSlice'
import { AddCommentForm } from '../comments/AddCommentForm'

import './SinglePostPage.scss'

store.dispatch(fetchComments())

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
      <article className="post">
        <div className="post_top">
          <div className="post_top_left">
            <PostAuthor userId={post.owner_id} />
            <TimeAgo timestamp={post.created_at} />
          </div>
          <div className="post_top_right">
            <h2>{post.title}</h2>
            <p className="post-content">{post.content}</p>
            {/* <ReactionButtons post={post} /> */}
          </div>
        </div>
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
      <AddCommentForm />
      <CommentsList postId={postId} />
    </section>
  )
}
