import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PostExcerpt from './PostExcerpt';
import AddPostForm from './AddPostForm';

import {
  fetchPosts,
  selectPostIds,
} from './postsSlice'

export const PostsList = () => {
  const dispatch = useDispatch()
  const orderedPostIds = useSelector(selectPostIds)

  const postStatus = useSelector((state) => state.posts.status)
  const postError = useSelector((state) => state.posts.error)

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
    content = <div>{postError}</div>
  }

  return (
    <div className="pt-2">
      <AddPostForm />
      <section className="posts-list">
        <h2 className="mt-2 text-2xl font-bold text-center">Posts</h2>
        {content}
      </section>
    </div>
  )
}
