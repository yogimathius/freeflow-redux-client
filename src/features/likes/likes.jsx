import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
	fetchLikes, 
	selectLikesByPostId, 
  addNewLike,
  removeLike
} from './likesSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';

export default function Likes({ postId, userId }) {
	const dispatch = useDispatch()
	const likes = useSelector((state) => selectLikesByPostId(state, postId))
  const likeStatus = useSelector((state) => state.likes.status)
  const myLikes = userId ? likes.filter(
    (like) => userId === like.liker_id
  ) : "";  
	const likeSum = likes.length;

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
          addNewLike({   post_id: postId, liker_id: userId })
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
    onClick={() => unLike(postId, userId)}
    className=""
    icon={fasHeart} size="1x" />
  ) : (                  
    <FontAwesomeIcon 
      onClick={() => addLike(postId, userId)}
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
	);
};