import { combineReducers } from 'redux'
import postsReducer from '../features/posts/postsSlice'
import usersReducer from '../features/users/usersSlice'
import likesReducer from '../features/likes/likesSlice'
import commentsReducer from '../features/comments/commentsSlice';
import experiencesReducer from '../features/experiences/experiencesSlice';
import userLoginReducer from '../features/login/userLoginSlice';
import skillsReducer from '../features/dbSkills/dbSkillsSlice';
import userSkillsReducer from '../features/userSkills/userSkillsSlice';
import filtersReducer from '../features/filters/filtersSlice';
import selectedSkillsReducer from '../features/dbSkills/selectedSkills/selectedSkillsSlice';
import messagesReducer from '../features/messages/messagesSlice';

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


