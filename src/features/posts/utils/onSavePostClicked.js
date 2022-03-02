
export const OnSavePostClicked = async (
  content,
  selectedSkills,
  setAddRequestStatus,
  dispatch,
  addNewPost,
  userId,
  loggedInUser,
  setContent,
  emptySkillsDB,
  canSave
) => {
  console.log('called')
  if (canSave) {
    const skillIds = selectedSkills.map(skill => skill.value)
    try {
      setAddRequestStatus('pending')
      dispatch(
        addNewPost({
          owner_id: userId,
          text_body: content,
          active: true,
          is_helper: false,
          is_helped: false,
          avatar: loggedInUser.avatar,
          username: loggedInUser.username,
          skill_ids: skillIds
        })
      )
      // unwrapResult(postResultAction)
      setContent('')
      dispatch(emptySkillsDB())
    } catch (err) {
      console.error('Failed to save the post skill: ', err)
    } finally {
      setAddRequestStatus('idle')
    }
  }
}
