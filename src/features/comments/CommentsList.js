import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { formatDistanceToNow, parseISO } from 'date-fns'
import classnames from 'classnames'

import { selectAllUsers } from '../users/usersSlice'

import { selectAllComments } from './commentsSlice'

export const CommentsList = () => {
  const dispatch = useDispatch()
  const comments = useSelector(selectAllComments)
  const users = useSelector(selectAllUsers)

  // useEffect(() => {
  //   dispatch(allNotificationsRead())
  // })

  const renderedComments = comments.map((comment) => {
    const date = parseISO(comment.created_at)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find((user) => user.id === comment.owner_id) || {
      name: 'Unknown User',
    }

    const commentClassname = classnames('comment', {
      new: comment.isNew,
    })

    return (
      <div key={comment.id} className={commentClassname}>
        <div>
          <b>{user.first_name}</b> {comment.content}
        </div>
        <div title={comment.created_at}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  })

  return (
    <section className="commentsList">
      <h2>Comments</h2>
      {renderedComments}
    </section>
  )
}
