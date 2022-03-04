export const onEditPostClicked = async (
  content,
  setAddRequestStatus,
  dispatch,
  updatePost,
  unwrapResult,
  onSaveEdit,
  post) => {
  if (content) {
    try {
      setAddRequestStatus('pending')
      const resultAction = await dispatch(
        updatePost({ text_body: content, post_id: post.id })
      )
      unwrapResult(resultAction)
    } catch (err) {
      console.error('Failed to update post: ', err)
    } finally {
      setAddRequestStatus('idle')
      onSaveEdit()
    }
  }
}
