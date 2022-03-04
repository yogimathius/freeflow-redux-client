import React from 'react'

const EditForm = ({ content, onContentChanged }) => {
  return (
    <form className="">
      <label htmlFor="postContent"></label>
      <textarea
        className="bg-gray-200 w-full border-1 border-solid border-gray-300 rounded-xl p-3"
        id="postContent"
        name="postContent"
        value={content}
        onChange={onContentChanged}
        data-testid="postContent"
      />
    </form>
  )
}

export default EditForm
