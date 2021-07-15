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
import selectedSkillsReducer from '../features/dbSkills/selectedSkills/selectedSkillsSlice'
import messagesReducer from './messagesSlice'

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
  messages: messagesReducer
})

export default rootReducer
