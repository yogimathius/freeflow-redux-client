import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments, selectAllComments } from './commentsSlice';

export default function CommentList() {
  const dispatch = useDispatch()
  const comments = useSelector(selectAllComments)
  let content

  const commentsStatus = useSelector((state) => state.comments.status)
  const error = useSelector((state) => state.comments.error)

  useEffect(() => {
    if (commentsStatus === 'idle') {
      dispatch(fetchComments())
    }
  }, [commentsStatus, dispatch])

  if (commentsStatus === 'pending') {
    content = <div className="loader">Loading...</div>
  } else if (commentsStatus === 'fulfilled') {
    content = comments
  } else if (commentsStatus === 'rejected') {
    content = <div>{error}</div>
  }
  return <div>{content}</div>
}
