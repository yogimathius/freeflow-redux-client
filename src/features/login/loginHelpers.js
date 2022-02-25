import { fetchUserSkills } from '../../reducers/userSkillsSlice'
import { fetchSkills } from '../../reducers/dbSkillsSlice'
import { login } from '../../reducers/userLoginSlice'
import { loadState } from '../../helpers/localStorage'

export const handleLogin = async (values, dispatch, history) => {
  const username = values.username
  const password = values.password

  dispatch(login(username, password))
    .then((res) => {
      dispatch(fetchSkills())
      dispatch(fetchUserSkills())
      history.push('/dashboard')
    })
    .catch((err) => {
      console.error('Failed to login user: ', err)
    })
}

export const checkLoggedIn = (dispatch) => {
  const user = loadState()

  if (user !== undefined) {
    dispatch(fetchSkills())
    dispatch(fetchUserSkills())
    return true
  }
}
