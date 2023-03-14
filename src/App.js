import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
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
import {
  fetchExperiences,
  selectCompletedExperiencesByHelperId
} from './reducers/experiencesSlice.js'
import { fetchConversations } from './reducers/userConversationsSlice.js'
import AddPostForm from './features/posts/components/AddPostForm/AddPostForm.js'
import { OnSavePostClicked } from './features/posts/utils/onSavePostClicked.js'

function App () {
  const user = loadState()
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const [isDisabled, setDisabled] = useState(false)

  const openModal = () => {
    setDisabled(true)
    setShowModal(true)
  }

  const closeModal = () => {
    setDisabled(false)
    setShowModal(false)
  }
  console.log(user)
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

  const userExperiences = user
    ? useSelector((state) =>
      selectCompletedExperiencesByHelperId(state, user.id)
    )
    : null
  const experience = userExperiences ? userExperiences.length * 12 : null

  return (
    <Router>
      <div className="App font-body">
        <Navbar experience={experience} />
        <div className="rounded-lg lg:w-2/3 mx-auto ml-32 lg:ml-60">
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
                isPrivate={route.isPrivate}
                loggedInUser={user}
                openModal={openModal}
                isDisabled={isDisabled}
              />
            ))}
          </Routes>
        </div>
        {showModal
          ? (
          <AddPostForm
            OnSavePostClicked={OnSavePostClicked}
            closeModal={closeModal}
          />
            )
          : null}
      </div>
    </Router>
  )
}

export default App
