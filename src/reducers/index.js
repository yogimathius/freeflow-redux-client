import { combineReducers } from 'redux'
import postsReducer from './postsSlice'
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
  selectedUSer: selectedUserReducer,
  userConversations: userConversationReducer
})

export default rootReducer
