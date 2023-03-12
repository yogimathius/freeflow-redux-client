import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPost } from '../../reducers/postsSlice'
import SkillSelector from '../../../dbSkills/SkillSelector'
import { emptySkillsDB } from '../../../../reducers/selectedSkillsSlice'
import { checkPostErrors } from '../../utils/checkPostErrors'

export default function AddPostForm ({ OnSavePostClicked }) {
  const [error, setError] = useState('')
  const [content, setContent] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const postsState = useSelector(state => state.posts)
  const selectedSkills = useSelector(state => state.selectedSkills)

  const posts = postsState ? postsState.entities : ''

  const loggedInUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''

  const userId = loggedInUser.id
  const dispatch = useDispatch()
  const onContentChanged = (event) => setContent(event.target.value)

  const canSave =
    [content, userId].every(Boolean) && addRequestStatus === 'idle'

  let id

  const postLength = Object.keys(posts).length

  const validate = () => {
    if (checkPostErrors(content, selectedSkills) !== false) {
      const error = checkPostErrors(content, selectedSkills)
      setError(error)
      setTimeout(() => {
        setError('')
      }, 2000)
    } else {
      id = postLength + 1
      OnSavePostClicked(
        content,
        selectedSkills,
        setAddRequestStatus,
        dispatch,
        addNewPost,
        userId,
        loggedInUser,
        setContent,
        emptySkillsDB,
        canSave
      )
    }
  }

  return (
    <section className="xl:-mt-2 mb-4">
      <form
        className="space-y-2 mt-0">
        <label htmlFor="postContent"></label>
        <textarea
          placeholder="Add a new post..."
          className="w-full border-1 border-solid border-gray-400 rounded-xl p-5 active:rounded-xl"
          name="postContent"
          value={content}
          data-testid="postText"
          rows="3"
          onChange={onContentChanged}
        />

        <div className="grid grid-cols-4 space-x-2">
          <div className="col-span-2" data-testid="selector">
            <SkillSelector
              id={id}
            />
          </div>
          <div data-testid="errorMessage" className="flex justify-center items-center text-red-500 text-sm errorMessage">{error}</div>

          <div
          className="btn btn-primary flex items-center justify-center sendButton"
          type="button"
          data-testid="sendButton"
          onClick={() => validate()}
          disabled={!canSave}>
            Post
          </div>
        </div>
      </form>
    </section>
  )
}
