import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'
import UserImage from '../users/UserImage'
import { fetchComments, selectCommentsByPostId } from './commentsSlice'
import { Link } from 'react-router-dom'
import { saveState } from '../../helpers/localStorage'

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
  
  const renderedComments = comments.map((comment) => {

    const user = users.find((user) => user.id === comment.commenter_id) || {
      name: 'Unknown User',
    }

    return (
      <div key={comment.id} className="bg-white flex mx-1 border-2 border-solid border-green-500 border-opacity-25 rounded">
        <div className="p-3">

          <Link to={`/userprofile/${user.id}`} onClick={() => saveState(user.id)}>
            <div className="flex items-center space-x-2">
              <UserImage />
              <p className="font-semibold text-blue-500">{`${user.first_name} ${user.last_name}`}</p>
            </div>
          </Link>
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
