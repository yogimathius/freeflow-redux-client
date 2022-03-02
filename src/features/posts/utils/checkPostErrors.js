export const checkPostErrors = (content, skills) => {
  let error
  if (content === '') {
    error = 'Post cannot be blank'
    return error
  } else if (!skills || skills.length === 0) {
    error = 'Please select a skill'
    return error
  } else {
    return false
  }
}
