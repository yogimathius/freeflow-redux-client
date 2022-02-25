import { fetchUserSkills } from '../../reducers/userSkillsSlice'
import { fetchSkills } from '../../reducers/dbSkillsSlice'
import { login } from '../../reducers/userLoginSlice'

export const onLoginSubmitted = async (username, password, dispatch) => {
  console.log('login submitted')
  try {
    dispatch(login(username, password))
  } catch (err) {
    console.error('Failed to login user: ', err)
  } finally {
    dispatch(fetchSkills())
    dispatch(fetchUserSkills())
  }
}
