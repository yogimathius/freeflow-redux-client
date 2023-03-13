import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import routes from './config/routes.js'
import { Navbar } from './components/Navbar'

import AppRoute from './components/AppRoute'
import { fetchUserSkills } from './reducers/userSkillsSlice'
import { loadState } from './helpers/localStorage'
import { fetchSkills } from './reducers/dbSkillsSlice.js'
import { fetchPosts } from './features/posts/reducers/postsSlice.js'
import { fetchUsers } from './reducers/usersSlice.js'
import { fetchComments } from './reducers/commentsSlice.js'
import { fetchExperiences, selectCompletedExperiencesByHelperId } from './reducers/experiencesSlice.js'
import { fetchConversations } from './reducers/userConversationsSlice.js'

function App () {
  const user = loadState()
  const dispatch = useDispatch()
  useEffect(() => {
    if (user) {
      dispatch(fetchSkills())
      dispatch(fetchUserSkills())
      dispatch(fetchPosts())
      dispatch(fetchUsers())
      dispatch(fetchUsers())
      dispatch(fetchComments())
      dispatch(fetchExperiences())
      dispatch(fetchConversations(user.id))
    }
  }, [dispatch])

  const userExperiences = user ? useSelector((state) => selectCompletedExperiencesByHelperId(state, user.id)) : null
  const experience = userExperiences ? userExperiences.length * 12 : null

  return (
    <Router>

      <div className="App font-body">
        <Navbar experience={experience} />
        <div className="rounded-lg w-2/3 mx-auto ml-60">
          <Switch>
            {routes.map((route) => (
              <AppRoute
                key={route.path}
                path={route.path}
                component={route.component}
                isPrivate={route.isPrivate}
                loggedInUser={user}
              />
            ))}
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
