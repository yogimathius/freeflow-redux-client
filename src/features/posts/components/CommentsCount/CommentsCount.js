import React from 'react'

const CommentsCount = ({ commentsLength, setShowMessage, showMessage }) => {
  const commentCount = commentsLength > 1 ? commentsLength + ' comments' : commentsLength + ' comment'

  return (
    <button type="button" onClick={() => setShowMessage(!showMessage)} className="">
      <span>{commentCount}</span>
    </button>
  )
}

export default CommentsCount
