/* eslint-disable no-unused-vars */
import { unwrapResult } from '@reduxjs/toolkit'
import { removePost } from '../reducers/postsSlice'

const onDeletePostClicked = async (
  setAddRequestStatus,
  canEditOrRemove,
  postId,
  dispatch,
  transition,
  SHOW
) => {
  const post_id = postId
  if (canEditOrRemove) {
    try {
      setAddRequestStatus('pending')
      const resultAction = await dispatch(
        removePost(post_id, { post_id }, post_id)
      )
      unwrapResult(resultAction)
    } catch (err) {
      console.error('Failed to remove like from post: ', err)
    } finally {
      setAddRequestStatus('idle')
      transition(SHOW)
    }
  }
}

export default onDeletePostClicked
