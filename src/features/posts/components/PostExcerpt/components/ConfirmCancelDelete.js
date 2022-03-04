import React from 'react'

const ConfirmCancelDelete = ({
  onCancelDelete,
  onDeletePostClicked,
  transition,
  SHOW
}) => {
  return (
    <div className="flex justify-center">
    <div className="text-center border-2 border-red-500 px-12 py-3 w-min rounded-lg space-y-2">
      <div className="text-red-500 font-bold">Delete this post?</div>
      <div className="flex justify-center space-x-2">
        <button onClick={() => onCancelDelete(transition, SHOW)} className="btn btn-warning">Cancel</button>
        <button onClick={() => onDeletePostClicked()} className="btn btn-primary">Confirm</button>
      </div>
    </div>
  </div>
  )
}

export default ConfirmCancelDelete
