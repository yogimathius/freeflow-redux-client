import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import {
  selectAllPosts,
  fetchPosts,
  selectPostIds,
  selectPostById,
} from './postsSlice'

import {
  selectLikesByPostId,
  fetchLikes
} from './likes/likesSlice'
import Axios from 'axios'

let PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId))
  // const likesList = useSelector((state) => selectLikesByPostId(state, postId))
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    Axios.get(`http://localhost:8000/api/likes/`)
    .then((res) => {
      // console.log("res in use effect likes: ", res.data);
      setLikes(res.data)
    })
  })
  let postLikes
  if (likes) {
    postLikes = likes.filter(like => like.posting_id === postId)
  }
  console.log("likes in state: ", postLikes);
  // const likesCount = likesList.length;
  // console.log(likesCount);
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.owner_id} />
        <TimeAgo timestamp={post.created_at} />
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

  const postStatus = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchLikes())
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
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
