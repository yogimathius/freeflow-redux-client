/* eslint-disable no-unused-vars */
import { unwrapResult } from '@reduxjs/toolkit'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removePost } from '../../reducers/postsSlice'

const onDeletePostClicked = async ({
  setAddRequestStatus,
  canEditOrRemove,
  postId,
  dispatch
}) => {
  if (canEditOrRemove) {
    try {
      setAddRequestStatus('pending')
      const resultAction = await dispatch(
        removePost({ post_id: postId })
      )
      unwrapResult(resultAction)
    } catch (err) {
      console.error('Failed to remove like from post: ', err)
    } finally {
      setAddRequestStatus('idle')
    }
  }
}

export default onDeletePostClicked
