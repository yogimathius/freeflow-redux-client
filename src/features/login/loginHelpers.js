import { fetchUserSkills } from '../../reducers/userSkillsSlice'
import { fetchSkills } from '../../reducers/dbSkillsSlice'
import { fetchPosts } from '../posts/reducers/postsSlice'

import { login } from '../../reducers/userLoginSlice'
import { loadState } from '../../helpers/localStorage'
import { fetchUsers } from '../../reducers/usersSlice'
import { fetchComments } from '../../reducers/commentsSlice'
import { fetchExperiences } from '../../reducers/experiencesSlice'
import { fetchConversations } from '../../reducers/userConversationsSlice'

export const handleLogin = async (values, dispatch, history) => {
  const username = values.username
  const password = values.password

  dispatch(login(username, password))
    .then(() => {
      history.push('/dashboard')
    })
    .catch((err) => {
      console.error('Failed to login user: ', err)
    })
}

export const checkLoggedIn = (dispatch) => {
  const user = loadState()

  if (user) {
    return true
  }
}
