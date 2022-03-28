import React from 'react'

const SaveEditButton = ({
  validPost,
  content,
  onEditPostClicked,
  setAddRequestStatus,
  dispatch,
  updatePost,
  unwrapResult,
  onSaveEdit,
  post
}) => {
  return (
    <div className="flex justify-center">
    <button
      className="btn btn-tertiary"
      type="button"
      onClick={() => {
        if (validPost()) {
          return onEditPostClicked(
            content,
            setAddRequestStatus,
            dispatch,
            updatePost,
            unwrapResult,
            onSaveEdit,
            post
          )
        }
      }}
      data-testid="saveButton">
      Save Post
    </button>
  </div>
  )
}

export default SaveEditButton
