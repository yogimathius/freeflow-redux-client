import { combineReducers } from 'redux'
import postsReducer from '../features/posts/reducers/postsSlice'
import usersReducer from './usersSlice'
import likesReducer from './likesSlice'
import commentsReducer from './commentsSlice'
import experiencesReducer from './experiencesSlice'
import userLoginReducer from './userLoginSlice'
import skillsReducer from './dbSkillsSlice'
import userSkillsReducer from './userSkillsSlice'
import filtersReducer from './filtersSlice'
import selectedSkillsReducer from './selectedSkillsSlice'
import messagesReducer from './messagesSlice'
import selectedUserReducer from './selectedUserSlice'
import userConversationReducer from './userConversationsSlice'
import currentThreadReducer from './currentThreadSlice'
import unreadCountReducer from './unreadCountSlice'

const rootReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
  likes: likesReducer,
  user: userLoginReducer,
  comments: commentsReducer,
  experiences: experiencesReducer,
  skills: skillsReducer,
  userSkills: userSkillsReducer,
  visibilityFilters: filtersReducer,
  selectedSkills: selectedSkillsReducer,
  messages: messagesReducer,
  selectedUser: selectedUserReducer,
  userConversations: userConversationReducer,
  currentThread: currentThreadReducer,
  unreadCount: unreadCountReducer
})

export default rootReducer
