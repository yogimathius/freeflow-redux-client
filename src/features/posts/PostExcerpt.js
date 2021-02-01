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

    console.log("post likes: ", likesList.length);
  const likeSum = postLikes.length;

  const myLikes = user ? postLikes.filter(
    (like) => user.id === like.liker_id
  ) : "";  

  // console.log(myLikes, likeSum);
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
    // console.log("fetched: ", fetchedLikes.length);
  }

  const LikeUnlikeIcons = iAlreadyLikeThis ? (
    <FontAwesomeIcon 
    onClick={() => unLike(post.id, user.id)}
    className=""
    icon={fasHeart} size="1x" />
  ) : (                  
    <FontAwesomeIcon 
      onClick={() => addLike(post.post_id, user.id)}
      className="love"
      icon={farHeart} size="1x" />
  )

  const IPlusOneLikesThis = iAlreadyLikeThis && likeSum > 1 ? 
    <p ><b>You and {likeSum - 1} others</b></p> : "";

  const PlusOneLikesThis = !iAlreadyLikeThis && likeSum > 1 ? 
    <p><b>{likeSum}  likes</b></p> : "";

  const OnlyILikeThis = iAlreadyLikeThis && likeSum === 1 ? 
    <p ><b>You like this</b></p> : "";

  const OnlyOneLikesThis = !iAlreadyLikeThis && likeSum === 1 ? 
    <p><b>{likeSum} like</b></p> : "";

  return (
    <article className="border-solid border-2 border-black rounded-xl p-2 mx-1 my-3" key={post.id}>

      {/* TAGS, TIMEAGO */}
      <div className="flex justify-between">
        <h3 className="font-bold">Tags: {post.name}</h3>
        <TimeAgo timestamp={post.time_posted} />
      </div>

      {/* POST AUTHOR */}
      <Link to={`/userprofile/${post.owner_id}`}
      onClick={() => setCookie(post.owner_id)}
      >
        <PostAuthor onClick={saveState(post.owner_id)} userId={post.owner_id} />
      </Link>
      
      {/* TEXT BODY */}
      <p className="post-content">{post.text_body}</p>

      {/* LIKES */}
      <div className="flex items-start justify-end">
        
        {/* conditionally renders like or unlike icon */}
        {LikeUnlikeIcons}

        {/* LIKES COUNT - conditionally renders one of these like count templates */}
        {IPlusOneLikesThis}
        {PlusOneLikesThis}
        {OnlyILikeThis}
        {OnlyOneLikesThis}

			</div>

      {/* VIEW POST */}
      <Link to={`/posts/${post.id}`} className="btn btn-secondary my-2 flex justify-center">
        View Post
      </Link>
    </article>
  )
}