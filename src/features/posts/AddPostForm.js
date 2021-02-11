import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { addNewPost } from './postsSlice'
import SkillSelector from '../dbSkills/SkillSelector'
import { addPostSkills } from '../postSkills/postSkillsSlice'
import generateUID from '../../helpers/generateRandomId'

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

  let wasSubmitted = false;
  const OnSavePostClicked = async () => {
    let uniquePostSkillId = generateUID()
    postSkillKeys.forEach(skillId => 
      skillId === uniquePostSkillId ? uniquePostSkillId = generateUID() : "")
    
    const selectedSkill = JSON.parse(localStorage.getItem('selected_skill'));

    if (content === "") {
      setError("Post cannot be blank");
      return
    }
    if (selectedSkill === null) {
      setError("Please select a skill"); 
      return
    } else if (canSave) {
      let skillsArr = [selectedSkill.id]
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
            skill_ids: skillsArr
          })
        )
        unwrapResult(postResultAction)
        setContent('')
        setAddRequestStatus('pending')
        // const postSkillResultAction = await dispatch(
        //   addPostSkills({ 
        //     id: uniquePostSkillId,
        //     post_id: id,
        //     db_skills_id: selectedSkill.id, 
        //     name: selectedSkill.name
        //   })
        // )

          // unwrapResult(postSkillResultAction)
        } catch (err) {
          console.error('Failed to save the post skill: ', err)
        } finally {
          setAddRequestStatus('idle')
          localStorage.setItem('selected_skill', null);
          setError("")
          wasSubmitted = true;
        }
      } 
    }
  }
  return (
    <section>
      <SkillSelector 
        id={id}
        // canTriggerAxios={triggerPostSkillAxios}
        loggedInUser={loggedInUser}
        wasSubmitted={wasSubmitted} />
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
