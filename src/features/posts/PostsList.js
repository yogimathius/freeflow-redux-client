import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
// import { ReactionButtons } from './ReactionButtons'
import {
  // selectAllPosts,
  fetchPosts,
  selectPostIds,
  selectPostById,
} from './postsSlice'

import {
  selectLikesByPostId,
  fetchLikes,
  selectAlllikes
} from './likes/likesSlice'

let PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId))

  const likesList = useSelector((state) => selectLikesByPostId(state, postId))

  console.log(likesList);

  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.owner_id} />
        <TimeAgo timestamp={post.created_at} />
        {likesList.length > 1 ?       <p>{likesList.length} likes</p> :
        ""
        }
        {likesList.length === 1 ?       <p>{likesList.length} like</p> :
        ""
        }
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      {/* <ReactionButtons post={post} /> */}
      <Link to={`/posts/${post.post_id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}

export const PostsList = () => {
  const dispatch = useDispatch()
  const orderedPostIds = useSelector(selectPostIds)
  const likes = useSelector(selectAlllikes)

  const postStatus = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)

  const likeStatus = useSelector((state) => state.likes.status)
  const likeError = useSelector((state) => state.likes.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content

  if (postStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } else if (postStatus === 'succeeded') {
    content = orderedPostIds.map((postId) => (
      <PostExcerpt key={postId} postId={postId} />
    ))
  } else if (postStatus === 'failed') {
    content = <div>{likeError}</div>
  }

  useEffect(() => {
    if (likeStatus === 'idle') {
      dispatch(fetchLikes())
    }
  }, [likeStatus, dispatch])

  let likesContent

  if (likeStatus === 'loading') {
    likesContent = <div className="loader">Loading...</div>
  } else if (likeStatus === 'succeeded') {
    likesContent = likes.length
  } else if (postStatus === 'failed') {
    likesContent = <div>{error}</div>
  }
  
  console.log(likesContent);

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
