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
    .then((res) => {
      console.log(res)
      dispatch(fetchSkills())
      dispatch(fetchUserSkills())
      dispatch(fetchPosts())
      dispatch(fetchUsers())
      dispatch(fetchUsers())
      dispatch(fetchComments())
      dispatch(fetchExperiences())
      dispatch(fetchConversations(res[0].id))
    })
    .then(() => {
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
