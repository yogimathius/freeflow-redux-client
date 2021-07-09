/* eslint-disable react/prop-types */
import { unwrapResult } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewMessage } from './messagesSlice'

const MessageTextEditor = ({ receiverId, userId, receiver, sender }) => {
  const [error, setError] = useState('')
  const [content, setContent] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

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

    try {
      setAddRequestStatus('pending')
      const postResultAction = await dispatch(
        addNewMessage({
          senderID: userId,
          content: content,
          receiverID: receiverId,
          sender,
          receiver
        })
      )
      unwrapResult(postResultAction)
      setContent('')
    } catch (err) {
      console.error('Failed to create new message: ', err)
    } finally {
      setAddRequestStatus('idle')
      setError('')
    }
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
        <div className="flex items-end justify-center">
          <div
          className="btn btn-primary flex items-center justify-center mr-4 h-12 w-full"
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
