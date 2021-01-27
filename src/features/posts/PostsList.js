import React, { useEffect, useState } from 'react'
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
  selectAlllikes,
  addNewLike,
  removeLike
} from '../likes/likesSlice'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { unwrapResult } from '@reduxjs/toolkit'

export const PostExcerpt = ({ postId }) => {
  const loggedInUser = JSON.parse(localStorage.getItem('currentUser'))

  const post = useSelector((state) => selectPostById(state, postId))

  const likesList = useSelector((state) => selectLikesByPostId(state, postId))

  const likes = useSelector(selectAlllikes)

  const postLikes = likes.filter(
    (like) => post.post_id === like.post_id
  );

  const likeSum = postLikes.length;

  const myLikes = loggedInUser ? postLikes.filter(
    (like) => loggedInUser.id === like.liker_id
  ) : "";  
  
  const iAlreadyLikeThis = myLikes ? myLikes.length > 0 : "";

  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch()

  const canSave =
   addRequestStatus === 'idle'

  const addLike = async () => {
    if (canSave) {
      try {
        // console.log("userid in postclicked fun: ", userId);
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          addNewLike({   posting_id: post.id, liker_id: loggedInUser.id })
        )
        unwrapResult(resultAction)

      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const unLike = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          removeLike({   posting_id: post.id, owner_id: loggedInUser.id })
        )
        unwrapResult(resultAction)

      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  return (
    <article className="" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.owner_id} />
        <TimeAgo timestamp={post.created_at} />
        {likesList.length > 1 ?       
        <p>{likesList.length} likes</p> :
        ""
        }
        {likesList.length === 1 ?       
        <p>{likesList.length} like</p> :
        ""
        }
        <div>
			 <div>
				{iAlreadyLikeThis ? (
					<FontAwesomeIcon 
					onClick={() => unLike(post.post_id, loggedInUser.id)}
					className="unlove"
					icon={fasHeart} size="1x" />
				) : (                  
					<FontAwesomeIcon 
						onClick={() => addLike(post.post_id, loggedInUser.id)}
						className="love"
						icon={farHeart} size="1x" />
				)}

				<div >
					{/* LIKE COUNT */}

					{iAlreadyLikeThis && likeSum > 1 ? 
						<p onClick={() => unLike(post.post_id, loggedInUser.id)}>
						<b>You and {likeSum - 1} others</b></p> : ""}

					{!iAlreadyLikeThis && likeSum > 1 ? 
						<p onClick={() => addLike(post.post_id, loggedInUser.id)}>
						<b>{likeSum}  likes</b></p> : ""}

					{iAlreadyLikeThis && likeSum === 1 ? 
						<p                       onClick={() => unLike(post.post_id, loggedInUser.id)}>
						<b>You like this</b></p> : ""}

					{!iAlreadyLikeThis && likeSum === 1 ? 
					<p onClick={() => addLike(post.post_id, loggedInUser.id)}><b>{likeSum} like</b></p> : ""}
					
				</div>
			</div>
		</div>
      </div>
      <p className="post-content">{post.text_body}</p>

      {/* <ReactionButtons post={post} /> */}
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}

export const PostsList = () => {
  const dispatch = useDispatch()
  const orderedPostIds = useSelector(selectPostIds)

  const postStatus = useSelector((state) => state.posts.status)
  const postError = useSelector((state) => state.posts.error)

  const likeStatus = useSelector((state) => state.likes.status)

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

  useEffect(() => {
    if (likeStatus === 'idle') {
      dispatch(fetchLikes())
    }
  }, [likeStatus, dispatch])

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
