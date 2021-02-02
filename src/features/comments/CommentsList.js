import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { formatDistanceToNow, parseISO } from 'date-fns'
import classnames from 'classnames'

import { selectAllUsers } from '../users/usersSlice'
import UserImage from '../users/UserImage'
import { fetchComments, selectCommentsByPostId } from './commentsSlice'
import { selectAllExperiences } from '../experiences/experiencesSlice'

export const CommentsList = ({ postId }) => {
  const comments = useSelector((state) => selectCommentsByPostId(state, parseInt(postId)))
  console.log(typeof parseInt(postId));
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
    content = comments
  } else if (commentsStatus === 'rejected') {
    content = <div>{error}</div>
  }
  
  console.log(content, postId);
  const users = useSelector(selectAllUsers)
  const karmas = useSelector(selectAllExperiences)
  
  const renderedComments = comments.map((comment) => {
    // const date = parseISO(comment.time_posted)
    // const timeAgo = formatDistanceToNow(date)

    const user = users.find((user) => user.id === comment.commenter_id) || {
      name: 'Unknown User',
    }

    const commentClassname = classnames('comment', {
      new: comment.isNew,
    })

    const commentKarmas = karmas.filter(karma => karma.comment_id === comment.id)

    const commentExperience = (commentKarmas.length * 29);

    return (
      <div key={comment.id} className="flex">
        <div className="bg-gray-200 rounded-xl p-3">
          <div className="flex items-center space-x-2">
          <UserImage />
            <p className="font-semibold">{`${user.first_name} ${user.last_name}`}</p>
          </div>
          {comment.text_body}
        </div>
      </div>
    )
  })

  return (
    <section className="commentsList">
      {renderedComments}
    </section>
  )
}
