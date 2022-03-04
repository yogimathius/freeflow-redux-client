import React from 'react'

const EditDeleteButtons = ({ onEdit, onConfirmDelete, transition, EDITING, CONFIRM }) => {
  return (
    <div className="space-x-1 flex justify-end mr-2">
    <button
      role="button"
      onClick={() => onEdit(transition, EDITING) }
      className="text-red-600 cursor-pointer text-sm"
      data-testid="editButton"
    >
        Edit
    </button>
    <button
      onClick={() => onConfirmDelete(transition, CONFIRM)}
      className="text-red-600 cursor-pointer text-sm"
      data-testid="confirmDeleteButton"
    >
      Delete
    </button>
  </div>
  )
}

export default EditDeleteButtons
