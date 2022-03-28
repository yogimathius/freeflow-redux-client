import React, { useState } from 'react'

const CommentsCount = ({ commentsLength, setShowMessage, showMessage }) => {
  const commentCount = commentsLength > 1 ? commentsLength + ' comments' : commentsLength + ' comment'

  const view = showMessage ? 'Hide ' : 'View '
  return (
    <button type="button" onClick={() => setShowMessage(!showMessage)} className="flex justify-center w-full font-semibold text-gray-500 underline">
      <span>{view} {commentCount}</span>
    </button>
  )
}

export default CommentsCount
