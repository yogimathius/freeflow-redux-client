import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import {
  selectPostById,
} from './postsSlice'

import {
  fetchLikes
} from '../likes/likesSlice'

import {
  selectLikesByPostId,
  selectAlllikes,
  addNewLike,
  removeLike
} from '../likes/likesSlice'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { unwrapResult } from '@reduxjs/toolkit'
import { saveState } from '../../helpers/localStorage'

export default function PostExcerpt({ postId }) {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.user)

  const post = useSelector((state) => selectPostById(state, postId))

  const likesList = useSelector((state) => selectLikesByPostId(state, postId))

  const likes = useSelector(selectAlllikes)

  const likeStatus = useSelector((state) => state.likes.status)

  const postLikes = likes.filter(
    (like) => {
      return post.id === like.post_id
    });

  const likeSum = postLikes.length;

  const myLikes = user ? postLikes.filter(
    (like) => user.id === like.liker_id
  ) : "";  

  const iAlreadyLikeThis = myLikes ? myLikes.length > 0 : "";

  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const canSave =
   addRequestStatus === 'idle'

  const addLike = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          addNewLike({   post_id: postId, liker_id: user.id })
        )
        unwrapResult(resultAction)

      } catch (err) {
        console.error('Failed to add like to post: ', err)
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
          removeLike({   post_id: post.id, liker_id: user.id })
        )
        unwrapResult(resultAction)

      } catch (err) {
        console.error('Failed to remove like from post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const setCookie = (id) => {
    saveState(id)
  }

  useEffect(() => {
    if (likeStatus === 'idle') {
      dispatch(fetchLikes())
    }
  }, [likeStatus, dispatch])
  let fetchedLikes
  if (likeStatus === 'loading') {
    fetchedLikes = null
  } else if (likeStatus === 'succeeded') {
    fetchedLikes = likes
  } else if (likeStatus === 'failed') {
    fetchedLikes = null
  }
  if (fetchedLikes !== undefined && fetchedLikes !== null) {
    console.log("fetched: ", fetchedLikes.length);
  }

  return (
    <article className="border-solid border-2 border-black rounded-xl p-2 m-2" key={post.id}>
      <h3 className="font-bold">Tags: {post.name}</h3>
      <div className="flex">
        <Link to={`/userprofile/${post.owner_id}`}
        onClick={() => setCookie(post.owner_id)}
        >
          <PostAuthor onClick={saveState(post.owner_id)} userId={post.owner_id} />
        </Link>
        <TimeAgo timestamp={post.time_posted} />
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
					onClick={() => unLike(post.id, user.id)}
					className=""
					icon={fasHeart} size="1x" />
				) : (                  
					<FontAwesomeIcon 
						onClick={() => addLike(post.post_id, user.id)}
						className="love"
						icon={farHeart} size="1x" />
				)}

				<div >
					{/* LIKE COUNT */}

					{iAlreadyLikeThis && likeSum > 1 ? 
						<p onClick={() => unLike(post.post_id, user.id)}>
						<b>You and {likeSum - 1} others</b></p> : ""}

					{!iAlreadyLikeThis && likeSum > 1 ? 
						<p onClick={() => addLike(post.post_id, user.id)}>
						<b>{likeSum}  likes</b></p> : ""}

					{iAlreadyLikeThis && likeSum === 1 ? 
						<p                       onClick={() => unLike(post.post_id, user.id)}>
						<b>You like this</b></p> : ""}

					{!iAlreadyLikeThis && likeSum === 1 ? 
					<p onClick={() => addLike(post.post_id, user.id)}><b>{likeSum} like</b></p> : ""}
					
				</div>
			</div>
		</div>
      </div>
      <p className="post-content">{post.text_body}</p>

      {/* <ReactionButtons post={post} /> */}
      <Link to={`/posts/${post.id}`} className="btn btn-secondary my-2 flex justify-center">
        View Post
      </Link>
    </article>
  )
}