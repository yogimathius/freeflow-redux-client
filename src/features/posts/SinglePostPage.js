import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import store from '../../app/store';

import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
// import { ReactionButtons } from './ReactionButtons'
import { CommentsList } from '../comments/CommentsList'
import { selectPostById } from './postsSlice'
import { fetchComments } from '../comments/commentsSlice';
import { AddCommentForm } from '../comments/AddCommentForm';

store.dispatch(fetchComments());

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
        <h2>{post.title}</h2>
        <div>
          <PostAuthor userId={post.owner_id} />
          <TimeAgo timestamp={post.create_at} />
        </div>
        <p className="post-content">{post.content}</p>
        {/* <ReactionButtons post={post} /> */}
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
      <AddCommentForm postId={postId} />
      <CommentsList postId={Number(postId)} />
    </section>
  )
}
