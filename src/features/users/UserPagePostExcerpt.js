import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { TimeAgo } from '../posts/TimeAgo'
import {
  selectPostById,
} from '../posts/postsSlice'

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

export default function UserPagePostExcerpt({ postId }) {
  const loggedInUser = JSON.parse(localStorage.getItem('user'))

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

  const setCookie = (id) => {
    saveState(id)
  }

  return (
    <article className="" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <Link to={`/users/${post.owner_id}`}
        onClick={() => setCookie(post.owner_id)}
        >
        </Link>
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