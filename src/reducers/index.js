import { combineReducers } from 'redux'
import postsReducer from '../features/posts/postsSlice'
import usersReducer from '../features/users/usersSlice'
import likesReducer from '../features/likes/likesSlice'
import commentsReducer from '../features/comments/commentsSlice';
import experiencesReducer from '../features/experiences/experiencesSlice';
import userLoginReducer from '../features/login/userLoginSlice';
import skillsReducer from '../features/dbSkills/dbSkillsSlice';
import userSkillsReducer from '../features/userSkills/userSkillsSlice';

const rootReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
  likes: likesReducer,
  user: userLoginReducer,
  comments: commentsReducer,
  experiences: experiencesReducer,
  skills: skillsReducer,
  userSkills: userSkillsReducer,
})

export default rootReducer