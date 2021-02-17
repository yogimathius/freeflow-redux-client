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
import { CommentsList } from '../comments/CommentsList';
import { AddCommentForm } from '../comments/AddCommentForm';
import { selectCommentsByPostId } from '../comments/commentsSlice';
import useVisualMode from "../../hooks/useVisualMode";
import { EditPostForm } from './EditPostForm';
import PostExcerptSkills from './PostExcerptSkills';

const SHOW = "SHOW";
const CONFIRM = "CONFIRM";
// const SAVING = "SAVING";
const EDITING = "EDITING";
// const ERROR_SAVE = "ERROR_SAVE";
// const ERROR_DELETE = "ERROR_DELETE";

export default function PostExcerpt({ postId, onPost, index }) {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.user)

  const loggedInUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : "";
  
  const userId = loggedInUser.id;
  const post = useSelector((state) => selectPostById(state, postId))

  const postComments = useSelector((state) => selectCommentsByPostId(state, postId))

  const commentsLength = postComments.length

  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const { mode, transition } = useVisualMode(SHOW);


  function onEdit() {
    transition(EDITING);
  }

  function onSaveEdit() {
    transition(SHOW);
  }

  function onConfirmDelete() {
    transition(CONFIRM)
  }

  function onCancelDelete() {
    transition(SHOW)
  }

  const canEditOrRemove =
  [userId].every(Boolean) && addRequestStatus === 'idle'
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
        transition(SHOW)
      }
    }
  }

  return (
    <article className="rounded-lg p-2 my-3 bg-white shadow-lg space-y-4" key={post.id}>
      {/* TAGS, TIMEAGO */}
      <div className="flex justify-between my-3">
        <PostExcerptSkills postSkillIds={post.skill_ids} />
        <div>
          <TimeAgo timestamp={post.time_posted} />
          { userId === post.owner_id ?
          <div className="space-x-1 flex justify-end mr-2">

            {mode === SHOW && (
            <div className="space-x-1 flex justify-end mr-2">
              <button onClick={() => onEdit()} className="text-red-600 cursor-pointer text-sm">Edit</button>
              <button onClick={() => onConfirmDelete()} className="text-red-600 cursor-pointer text-sm">Delete</button>
            </div>
            
            )}
          </div>
            : ""
          }
        </div>
      </div>

      {/* POST AUTHOR */}
      <Link to={`/userprofile/${post.owner_id}`}
      onClick={() => saveState(post.owner_id)}
      >
        <UserNameAndLogo onClick={saveState(post.owner_id)} userId={post.owner_id} />
      </Link>
      
      {/* TEXT BODY */}
      {mode === SHOW && (

      <p className="flex justify-center px-12">{post.text_body}</p>
      )}

      {mode === EDITING && (
      <EditPostForm 
        postId={postId}
        onSaveEdit={onSaveEdit}
        value={post.text_body}
      />
      )}

      {mode === CONFIRM && (
        <div className="flex justify-center">
          <div className="text-center border-2 border-red-500 px-12 py-3 w-min rounded-lg space-y-2">
            <div className="text-red-500 font-bold">Delete this post?</div>
            <div className="flex justify-center space-x-2">
              <button onClick={() => onCancelDelete()} className="btn btn-warning">Cancel</button>
              <button onClick={() => onDeletePostClicked()} className="btn btn-primary">Confirm</button>
            </div>
          </div>
        </div>
        )}

      {/* LIKES */}
      <Likes postId={postId} userId={userId} />

      <div className="wrap-collapsible">
        
        <input 
          id={"collapsible" + index} className="toggle hidden"  
          type="checkbox">
        </input>
        {commentsLength === 0  ? "" : 
        
          <label htmlFor={"collapsible" + index} className="lbl-toggle">
          {/* COMMENTS LIST FOR POST */}

          {commentsLength > 1 ? <span>{commentsLength} comments</span> : ""}

          {commentsLength === 1 ? <span>{commentsLength} comment</span> : ""}

          </label>
        }
        <div className="collapsible-content">
          <CommentsList key={index} postId={postId} />
          <div>
            {/* <section className="validation">{error}</section> */}
          </div>
        </div>
        <AddCommentForm postId={postId} />
      </div>

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