import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchComments, selectCommentsByPostId } from '../../reducers/commentsSlice'
import CommentListItem from './CommentListItem'

export const CommentsList = ({ postId }) => {
  const comments = useSelector((state) => selectCommentsByPostId(state, parseInt(postId)))
  const dispatch = useDispatch()

  let content

  const commentsStatus = useSelector((state) => state.comments.status)
  const error = useSelector((state) => state.comments.error)

  const renderedComments = comments.map((comment, index) => {
    return (
      <CommentListItem key={index} comment={comment} postId={postId} />
    )
  })

  return (
    <ul>
      {content}
      {renderedComments}
    </ul>
  )
}
