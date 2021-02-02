import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { UserNameAndLogo } from '../users/UserNameAndLogo'
import { TimeAgo } from './TimeAgo'
import {
  removePost,
  selectPostById,
} from './postsSlice'

import {
  fetchLikes, selectLikesByPostId
} from '../likes/likesSlice'

import {
  addNewLike,
  removeLike
} from '../likes/likesSlice'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { unwrapResult } from '@reduxjs/toolkit'
import { saveState } from '../../helpers/localStorage'

export default function PostExcerpt({ postId, onPost }) {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.user)
	const loggedInUser = JSON.parse(localStorage.getItem('user'))
  const userId = loggedInUser.id;

  const post = useSelector((state) => selectPostById(state, postId))

  const likes = useSelector((state) => selectLikesByPostId(state, postId))
  const likeStatus = useSelector((state) => state.likes.status)

  const postLikes = likes.filter(
    (like) => {
      return post.id === like.post_id
    });

  const likeSum = postLikes.length;

  const myLikes = user ? postLikes.filter(
    (like) => user.id === like.liker_id
  ) : "";  
  // console.log("my likes: ",myLikes, "post: ", post);
  const iAlreadyLikeThis = myLikes ? myLikes.length > 0 : "";

  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const canSave =
   addRequestStatus === 'idle'

  //  ADDLIKE FUNCTION
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

  // UNLIKE FUNCTION
  const unLike = async () => {
    
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          removeLike({   id: myLikes[0].id, post_id: postId, liker_id: userId })
        )
        unwrapResult(resultAction)

      } catch (err) {
        console.error('Failed to remove like from post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const canEditOrRemove =
  [userId].every(Boolean) && addRequestStatus === 'idle'

  // EDIT POST DISPATCH
  const onEditPostClicked = async () => {
    if (canEditOrRemove) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          removePost({   post_id: post.id })
        )
        unwrapResult(resultAction)

      } catch (err) {
        console.error('Failed to remove like from post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  // DELETE POST DISPATCH
  const onDeletePostClicked = async () => {
    if (canEditOrRemove) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          removePost({   post_id: post.id })
        )
        unwrapResult(resultAction)

      } catch (err) {
        console.error('Failed to remove like from post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }
  
  // FETCH LIKES USEEFFECT
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
  }

  // LIKE UNLIKE FUNCTION
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


  // LIKES COUNT
  const IPlusOneLikesThis = iAlreadyLikeThis && likeSum > 1 ? 
    <p ><b>You and {likeSum - 1} others</b></p> : "";

  const PlusOneLikesThis = !iAlreadyLikeThis && likeSum > 1 ? 
    <p><b>{likeSum}  likes</b></p> : "";

  const OnlyILikeThis = iAlreadyLikeThis && likeSum === 1 ? 
    <p ><b>You like this</b></p> : "";

  const OnlyOneLikesThis = !iAlreadyLikeThis && likeSum === 1 ? 
    <p><b>{likeSum} like</b></p> : "";

  return (
    <article className="rounded p-2 mx-1 my-3 bg-white" key={post.id}>

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

      { userId === post.owner_id ?
        <button onClick={() => onEditPostClicked()} className="text-red-600 cursor-pointer text-sm">Edit</button>
        : ""
      }
      { userId === post.owner_id ?
        <button onClick={() => onDeletePostClicked()} className="text-red-600 cursor-pointer text-sm">Delete</button>
        : ""
      }
      
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
      { onPost !== true ?
        <Link to={`/posts/${post.id}`} className="btn btn-secondary my-2 flex justify-center">
          View Post
        </Link> : ""
      }

      { onPost === true && user && user.id === post.owner_id ? 
      <div className="flex justify-center">
          <Link to={`/editPost/${post.id}`} className="btn btn-primary">
            Edit Post
          </Link>
        </div>
                    : ""  
      }
    </article>
  )
}