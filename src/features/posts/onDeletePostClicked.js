/* eslint-disable no-unused-vars */
import { unwrapResult } from '@reduxjs/toolkit'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removePost } from '../../reducers/postsSlice'

const OnDeletePostClicked = async (props) => {
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const dispatch = useDispatch()

  if (props.canEditOrRemove) {
    try {
      setAddRequestStatus('pending')
      const resultAction = await dispatch(
        removePost({ post_id: props.postId })
      )
      unwrapResult(resultAction)
    } catch (err) {
      console.error('Failed to remove like from post: ', err)
    } finally {
      setAddRequestStatus('idle')
    }
  }
}

export default OnDeletePostClicked
