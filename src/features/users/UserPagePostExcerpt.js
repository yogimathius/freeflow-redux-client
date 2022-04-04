/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { TimeAgo } from '../posts/TimeAgo'
import {
  selectPostById
} from '../posts/postsSlice'

import {
  selectLikesByPostId,
  addNewLike,
  removeLike
} from '../../reducers/likesSlice'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import { unwrapResult } from '@reduxjs/toolkit'
import { loadState, saveState } from '../../helpers/localStorage'
import UserNameAndLogo from './components/UserNameAndLogo'

export default function UserPagePostExcerpt ({ postId }) {
  const loggedInUserID = loadState()

  const post = useSelector((state) => selectPostById(state, postId))

  const likesList = useSelector((state) => selectLikesByPostId(state, postId))

  const likeSum = likesList.length

  const myLikes = loggedInUserID
    ? likesList.filter(
      (like) => loggedInUserID === like.liker_id
    )
    : ''

  const iAlreadyLikeThis = myLikes ? myLikes.length > 0 : ''

  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch()

  const canSave =
   addRequestStatus === 'idle'

  const addLike = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          addNewLike({ posting_id: post.id, liker_id: loggedInUserID })
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
          removeLike({ posting_id: post.id, owner_id: loggedInUserID })
        )
        unwrapResult(resultAction)
      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const LikeUnlikeIcons = iAlreadyLikeThis
    ? (
    <FontAwesomeIcon
    onClick={() => unLike(post.id, loggedInUserID)}
    className=""
    icon={fasHeart} size="1x" />
      )
    : (
    <FontAwesomeIcon
      onClick={() => addLike(post.post_id, loggedInUserID)}
      className="love"
      icon={farHeart} size="1x" />
      )

  const IPlusOneLikesThis = iAlreadyLikeThis && likeSum > 1
    ? <p ><b>You and {likeSum - 1} others</b></p>
    : ''

  const PlusOneLikesThis = !iAlreadyLikeThis && likeSum > 1
    ? <p><b>{likeSum}  likes</b></p>
    : ''

  const OnlyILikeThis = iAlreadyLikeThis && likeSum === 1
    ? <p ><b>You like this</b></p>
    : ''

  const OnlyOneLikesThis = !iAlreadyLikeThis && likeSum === 1
    ? <p><b>{likeSum} like</b></p>
    : ''

  return (
    <article className="border-solid border-2 border-black rounded-xl p-4 md:mx-1 my-3 " key={post.id}>

      {/* TAGS, TIMEAGO */}
      <div className="flex justify-between my-3">
        <h3 className="font-bold">Tags: {post.name}</h3>
        <TimeAgo timestamp={post.time_posted} />
      </div>
      {/* POST AUTHOR */}
      <Link to={`/userprofile/${post.owner_id}`}
      onClick={() => saveState(post.owner_id)}
      >
        <UserNameAndLogo onClick={saveState(post.owner_id)} userId={post.owner_id} />
      </Link>

      {/* TEXT BODY */}
      <p className="post-content">{post.text_body}</p>

      {/* LIKES */}
      <div className="flex items-start justify-end space-x-2 mr-2 text-blue-500 mt-3 text-sm">

        {/* conditionally renders like or unlike icon */}
        {LikeUnlikeIcons}

        {/* LIKES COUNT - conditionally renders one of these like count templates */}
        <div className="-mt-0.5">
          {IPlusOneLikesThis}
          {PlusOneLikesThis}
          {OnlyILikeThis}
          {OnlyOneLikesThis}
        </div>

      </div>

      {/* VIEW POST */}
      <Link to={`/posts/${post.id}`} className="btn btn-secondary my-2 flex justify-center">
        View Post
      </Link>
    </article>
  )
}
