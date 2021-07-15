import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { addNewPost } from '../../reducers/postsSlice'
import SkillSelector from '../dbSkills/SkillSelector'
import { emptySkillsDB } from '../dbSkills/selectedSkills/selectedSkillsSlice'

// export const SkillsContext = React.createContext();
export default function AddPostForm () {
  const [error, setError] = useState('')
  const [content, setContent] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const postsState = useSelector(state => state.posts)

  const posts = postsState ? postsState.entities : ''

  const loggedInUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''

  const userId = loggedInUser.id
  const dispatch = useDispatch()
  const onContentChanged = (e) => setContent(e.target.value)

  const canSave =
    [content, userId].every(Boolean) && addRequestStatus === 'idle'

  let id

  const postLength = Object.keys(posts).length

  const OnSavePostClicked = async () => {
    const selectedSkills = JSON.parse(localStorage.getItem('selected_skills'))

    if (content === '') {
      setError('Post cannot be blank')
      setTimeout(() => {
        setError('')
      }, 2000)
      return
    }
    if (selectedSkills.length === 0) {
      setError('Please select a skill')
      setTimeout(() => {
        setError('')
      }, 2000)
    } else if (canSave) {
      id = postLength + 1
      if (id !== null && id !== undefined) {
        try {
          setAddRequestStatus('pending')
          const postResultAction = await dispatch(
            addNewPost({
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
          dispatch(emptySkillsDB())
        } catch (err) {
          console.error('Failed to save the post skill: ', err)
        } finally {
          setAddRequestStatus('idle')
          localStorage.setItem('selected_skill', null)
          setError('')
        }
      }
    }
  }

  return (
    <section className="mt-2">
      <form
        className="space-y-2 mx-2">
        <label htmlFor="postContent"></label>
        <textarea
          placeholder="Add a new post..."
          className="w-full  border-1 border-solid border-gray-400 rounded-xl p-5 active:rounded-xl"
          name="postContent"
          value={content}
          data-testid="postText"
          rows="3"
          onChange={onContentChanged}
        />

        <div className="grid grid-cols-4 space-x-2 mx-2 mb-12">
          <div className="col-span-3">
            <SkillSelector
              id={id}
            />
          </div>
          <div
          className="btn btn-primary flex items-center justify-center"
          type="button"
          data-testid="sendButton"
          onClick={OnSavePostClicked} disabled={!canSave}>
            Post
          </div>
        </div>
        <section className="flex justify-center text-red-500 text-sm h-4">{error}</section>
      </form>
    </section>
  )
}
