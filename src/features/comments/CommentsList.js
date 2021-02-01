import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { formatDistanceToNow, parseISO } from 'date-fns'
import classnames from 'classnames'

import { selectAllUsers } from '../users/usersSlice'

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

  console.log("comments in commentlist: ", comments);
  
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
      <div key={comment.id} className={commentClassname}>
        <div>
          {comment.text_body}
          <div title={comment.created_at}   className="commentInfo">
            <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`}/>
            <b>{`${user.first_name} ${user.last_name}`}</b>
            {commentExperience !== 0 ?             <p>Gained {commentExperience} experience </p>
            : "" }
            {/* <i className="commentTime">{timeAgo} ago</i> */}
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
