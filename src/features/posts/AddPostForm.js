import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { addNewPost, selectAllPosts } from './postsSlice'
import SkillSelector from '../dbSkills/SkillSelector'
import { addPostSkills } from '../postSkills/postSkillsSlice'
import generateUID from '../../helpers/generateRandomId';

export default function AddPostForm() {
  const [content, setContent] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const posts = useSelector((state) => selectAllPosts)
  const loggedInUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ""
  // const selectedSkill = JSON.parse(localStorage.getItem('selected_skill'))

  const userId = loggedInUser.id;
  const dispatch = useDispatch()
  const onContentChanged = (e) => setContent(e.target.value)

  const canSave =
    [content, userId].every(Boolean) && addRequestStatus === 'idle'

  let id;

  const postsArr = [];
  for (const postKey in posts) {
    if (Object.hasOwnProperty.call(posts, postKey)) {
      const post = posts[postKey];
      postsArr.push(post)
    }
  }

  const OnSavePostClicked = async () => {
    const selectedSkill = JSON.parse(localStorage.getItem('selected_skill'));

    // setTriggerPostSkillAxios(true);
    // addPostSkills(canSave)
    postsArr.forEach(post => {
      console.log("post: ", post);
    })
    if (canSave) {
      id = postsArr.forEach(post => {
        console.log("post: ", post);
      })
        // post.id !== generateUID() ? generateUID : "");
        // console.log(id);
      // if (id !== null && id !== undefined) {
        // console.log("random id: ", id);
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          addNewPost({ 
            id: id,
            owner_id: userId, 
            text_body: content,
            active: true, 
            is_helper: false, 
            is_helped: false, 
            avatar: loggedInUser.avatar,
            username: loggedInUser.username,
          })
        )
        unwrapResult(resultAction)
        setContent('')
      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          addPostSkills({ 
            post_id: id,
            db_skills_id: selectedSkill.id, 
          })
        )
        unwrapResult(resultAction)
      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    // }

    }
  }

  return (
    <section>
      <SkillSelector 
        id={id}
        // canTriggerAxios={triggerPostSkillAxios}
        loggedInUser={loggedInUser} />
      <form className="space-y-2 mx-2">
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
