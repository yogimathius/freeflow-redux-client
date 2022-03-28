import React from 'react'

const EditDeleteButtons = ({ onEdit, onConfirmDelete, transition, EDITING, CONFIRM }) => {
  return (
    <div className="space-x-2">
      <button
        role="button"
        onClick={() => onEdit(transition, EDITING) }
        className="text-red-600 cursor-pointer font-semibold"
        data-testid="editButton"
      >
          Edit
      </button>
      <button
        onClick={() => onConfirmDelete(transition, CONFIRM)}
        className="text-red-600 cursor-pointer font-semibold"
        data-testid="confirmDeleteButton"
      >
        Delete
      </button>
    </div>
  )
}

export default EditDeleteButtons
