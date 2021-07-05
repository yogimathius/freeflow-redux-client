/* eslint-disable react/prop-types */
import { unwrapResult } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewMessage } from './messagesSlice'

const MessageTextEditor = ({ receiverId }) => {
  const [error, setError] = useState('')
  const [content, setContent] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const loggedInUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''

  const userId = loggedInUser.id

  const dispatch = useDispatch()

  const onContentChanged = (e) => setContent(e.target.value)

  const canSave =
  [content, userId].every(Boolean) && addRequestStatus === 'idle'

  const OnSendMessageClicked = async () => {
    if (content === '') {
      setError('Message cannot be blank')
      setTimeout(() => {
        setError('')
      }, 2000)
    }
    // id = postLength + 1
    // if (id !== null && id !== undefined) {
    try {
      setAddRequestStatus('pending')
      const postResultAction = await dispatch(
        addNewMessage({
          senderID: userId,
          content: content,
          // active: true
          receiverID: receiverId
        })
      )
      unwrapResult(postResultAction)
      setContent('')
      // dispatch(emptySkillsDB())
    } catch (err) {
      console.error('Failed to save the post skill: ', err)
    } finally {
      setAddRequestStatus('idle')
      localStorage.setItem('selected_skill', null)
      setError('')
    }
    // }
    // }
  }

  return (
    <section className="mt-2">
      <form
        className="grid grid-cols-4 space-x-2">
        {/* <label htmlFor="postContent"></label> */}
        <textarea
          placeholder="Send a message..."
          className="col-span-3 w-full border-1 border-solid border-gray-400 rounded-lg p-4 active:rounded-xl"
          name="postContent"
          value={content}
          data-testid="postText"
          // rows="3"
          onChange={onContentChanged}
        />
        <div>
          <div
          className="btn btn-primary flex items-center justify-center"
          type="button"
          data-testid="sendButton"
          onClick={OnSendMessageClicked} disabled={!canSave}>
            Send
          </div>
        </div>
        <section className="flex justify-center text-red-500 text-sm h-4">{error}</section>
      </form>
    </section>
  )
}

export default MessageTextEditor
