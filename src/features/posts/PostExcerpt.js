import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import './CollapsibleCommentList.css';
import { UserNameAndLogo } from '../users/UserNameAndLogo'
import { TimeAgo } from './TimeAgo'
import {
  removePost,
  selectPostById,
} from './postsSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { saveState } from '../../helpers/localStorage'
import Likes from '../likes/likes';

export default function PostExcerpt({ postId, onPost, index }) {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.user)
	const loggedInUser = JSON.parse(localStorage.getItem('user'))
  const userId = loggedInUser.id;

  const post = useSelector((state) => selectPostById(state, postId))

  const [addRequestStatus, setAddRequestStatus] = useState('idle')


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
      <Likes postId={postId} userId={userId} />

      <div className="wrap-collapsible">

        <input 
          id={"collapsible" + index} className="toggle"  
          type="checkbox">
        </input>

        <label htmlFor={"collapsible" + index} className="lbl-toggle">
        {/* COMMENTS LIST FOR POST */}

        {/* {commentsLength > 1 ? <span>{commentsLength} comments</span> : ""}

        {commentsLength === 1 ? <span>{commentsLength} comment</span> : ""} */}

        </label>
        <div className="collapsible-content">{}
        {/* FOR COMMENTING */}
        <div className="center-textarea">
          {/* <textarea 
            className="comment-textarea"
            value={value}
            onChange={(event) => {
              setValue(event.target.value) 
              setError("")
            }}
            rows="2" placeholder="Leave a comment here.."
          ></textarea> */}
        </div>

        <div className="comment-like-button-flex">
          {/* <div className="comment-button button-transition"onClick={() => onValidateComment()}>Comment</div> */}
        </div>
        <div>
          {/* <section className="validation">{error}</section> */}
        </div>

      </div>
      </div>
      {/* VIEW POST */}
      { onPost !== true ?
        <Link to={`/posts/${post.id}`} className="btn btn-secondary my-2 flex justify-center">
          View Comments
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