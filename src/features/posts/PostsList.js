import React, { useEffect } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import PostExcerpt from './PostExcerpt';
import AddPostForm from './AddPostForm';

import {
  fetchPosts,
} from './postsSlice'
import Filter from '../filters/Filter';
import { fetchSkills } from '../dbSkills/dbSkillsSlice';
import { fetchUserSkills } from '../userSkills/userSkillsSlice';

const PostsList = ({posts}) => {
  const dispatch = useDispatch()

  const postStatus = useSelector((state) => state.posts.status)
  const postError = useSelector((state) => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
      dispatch(fetchUserSkills())
    }
  }, [postStatus, dispatch])

  useEffect(() => {
      dispatch(fetchSkills())
  }, [dispatch])

  let content

  if (postStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } else if (postStatus === 'succeeded') {
    content = posts.map((post, index) => (
      <PostExcerpt key={index} postId={post.id} index={index} />
    ))
  } else if (postStatus === 'failed') {
    content = <div>{postError}</div>
  }

  return (
    <div className="pt-3 mx-2">
      <AddPostForm />
      <Filter />
      {posts.length !== 0 ? 
        <section className="">
          {content}
        </section>
      : 
      <div className="flex justify-center h-24 items-center bg-white mx-2 mt-3 rounded-lg border-1 border-gray-300 mb-3">Sorry! None found.</div>
    }
    </div>
  )
}

export default connect(null) (PostsList);
