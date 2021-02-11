import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { addNewPost } from './postsSlice'
import SkillSelector from '../dbSkills/SkillSelector'
import generateUID from '../../helpers/generateRandomId'
import { setSelectedSkills } from '../dbSkills/selectedSkills/selectedSkillsSlice';

export default function AddPostForm() {
  const [error, setError] = useState("");
  const [content, setContent] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const posts = useSelector(state => state.posts.entities)

  const postSkills = useSelector(state => state.postSkills.entities)

  const loggedInUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ""
  

  const userId = loggedInUser.id;
  const dispatch = useDispatch()
  const onContentChanged = (e) => setContent(e.target.value)

  const canSave =
    [content, userId].every(Boolean) && addRequestStatus === 'idle'

  let id;

  let postLength = Object.keys(posts).length;

  const postSkillKeys = Object.keys(postSkills)
	const clearValue = (callback) => {
		callback()
	}

  const OnSavePostClicked = async () => {
    let uniquePostSkillId = generateUID()
    postSkillKeys.forEach(skillId => 
      skillId === uniquePostSkillId ? uniquePostSkillId = generateUID() : "")
    
    const selectedSkills = JSON.parse(localStorage.getItem('selected_skills'));

    if (content === "") {
      setError("Post cannot be blank");
      return
    }
    if (selectedSkills === null) {
      setError("Please select a skill"); 
      return
    } else if (canSave) {
      id = postLength + 1;
      if (id !== null && id !== undefined) {
      try {
        setAddRequestStatus('pending')
        const postResultAction = await dispatch(
          addNewPost({ 
            // id: id,
            owner_id: userId, 
            text_body: content,
            active: true, 
            is_helper: false, 
            is_helped: false, 
            avatar: loggedInUser.avatar,
            username: loggedInUser.username,
            skill_ids: selectedSkills
          })
        )
        unwrapResult(postResultAction)
        setContent('')
        dispatch(setSelectedSkills([]))
        setAddRequestStatus('pending')
        } catch (err) {
          console.error('Failed to save the post skill: ', err)
        } finally {
          setAddRequestStatus('idle')
          localStorage.setItem('selected_skill', null);
          setError("")

        }
      } 
    }
  }
  const initialFormState = { mySelectKey: null };

  return (
    <section>
      <form className="space-y-2 mx-2">
        <SkillSelector 
          id={id}
          initialFormState={initialFormState}
          // clearValue={clearValue}
        />
        <label htmlFor="postContent"></label>
        <textarea
          placeholder="Add a new post..."
          className="w-full  border-1 border-solid border-gray-400 rounded-xl p-5" 
          id="postContent rounded-xl"
          name="postContent"
          value={content}
          data-testid="postText"
          rows="3"
          onChange={onContentChanged}
        />
        <section className="flex justify-center validation">{error}</section>

        <div className="flex justify-center">

          <div 
          className="btn btn-primary"
          type="button" 
          data-testid="sendButton"
          onClick={OnSavePostClicked} disabled={!canSave}>
            Post
          </div>
        </div>
      </form>
    </section>
  )
}
