import React from 'react'
import { useSelector } from 'react-redux'
import { formatDistanceToNow, parseISO } from 'date-fns'
import classnames from 'classnames'

import { selectAllUsers } from '../users/usersSlice'

import { selectCommentsByPostId } from './commentsSlice'
import { selectAllkarmas } from '../karmas/karmasSlice'

export const CommentsList = ({ postId }) => {
  // const dispatch = useDispatch()
  const comments = useSelector((state) => selectCommentsByPostId(state, postId))
  const users = useSelector(selectAllUsers)
  const karmas = useSelector(selectAllkarmas)

  const renderedComments = comments.map((comment) => {
    const date = parseISO(comment.created_at)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find((user) => user.id === comment.commenter_id) || {
      name: 'Unknown User',
    }
    // console.log("comment: ", comment);

    const commentClassname = classnames('comment', {
      new: comment.isNew,
    })

    const commentKarmas = karmas.filter(karma => karma.comment_id === comment.id)
    console.log("comment karmas: ", commentKarmas);
    const commentExperience = (commentKarmas.length * 29);

    return (
      <div key={comment.id} className={commentClassname}>
        <div>
          {comment.content}
          <div title={comment.created_at}   className="commentInfo">
            <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`}/>
            <b>{`${user.first_name} ${user.last_name}`}</b>
            <p>Gained {commentExperience} experience </p>
            <i className="commentTime">{timeAgo} ago</i>
          </div>
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
