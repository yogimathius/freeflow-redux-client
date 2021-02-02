import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

import { addNewPost } from './postsSlice'
import SkillSelector from '../dbSkills/SkillSelector'

export default function AddPostForm() {
  const [content, setContent] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
	const loggedInUser = JSON.parse(localStorage.getItem('user'))
  const userId = loggedInUser.id;
  const dispatch = useDispatch()
  const onContentChanged = (e) => setContent(e.target.value)

  const canSave =
    [content, userId].every(Boolean) && addRequestStatus === 'idle'

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          addNewPost({ 
            owner_id: userId, 
            text_body: content,
            active: true, 
            is_helper: false, 
            is_helped: false, 
            avatar: loggedInUser.avatar,
            username: loggedInUser.username
          })
        )
        unwrapResult(resultAction)
        setContent('')
      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  return (
    <section>
      <SkillSelector />
      <form className="space-y-2 mx-2">
        <label htmlFor="postContent"></label>
        <textarea
          placeholder="Add a new post..."
          className="w-full  border-1 border-solid border-gray-400 rounded-xl" 
          id="postContent rounded-xl"
          name="postContent"
          value={content}
          data-testid="postText"
          rows="3"
          onChange={onContentChanged}
        />
        <div className="flex justify-center">
          <div 
          className="btn btn-primary"
          type="button" 
          data-testid="sendButton"
          onClick={onSavePostClicked} disabled={!canSave}>
            Post
          </div>
        </div>
      </form>
    </section>
  )
}
