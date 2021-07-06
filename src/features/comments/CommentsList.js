import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchComments, selectCommentsByPostId } from './commentsSlice'
import CommentListItem from './CommentListItem'

export const CommentsList = ({ postId }) => {
  const comments = useSelector((state) => selectCommentsByPostId(state, parseInt(postId)))
  const dispatch = useDispatch()

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
    
  } else if (commentsStatus === 'rejected') {
    content = <div>{error}</div>
  }

  const renderedComments = comments.map((comment, index) => {
    return (
      <CommentListItem key={index} comment={comment} postId={postId} />
    )
  })

  return (
    <section className="commentsList">
      {content}
      {renderedComments}
    </section>
  )
}
