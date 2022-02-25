import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { AuthProvider } from './context'
import routes from './config/routes.js'
import { Navbar } from './components/Navbar'

import AppRoute from './components/AppRoute'
import UserSideBar from './features/users/UserSideBar'
import { fetchUserSkills } from './reducers/userSkillsSlice'
import { loadState } from './helpers/localStorage'

function App () {
  const user = loadState()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUserSkills())
  }, [dispatch])

  return (
    <AuthProvider>
      <Router>

        <div className="App xl:grid grid-cols-10 font-body">
          <Navbar />
          <div className="hidden xl:col-span-2 xl:flex justify-center">
            { user
              ? <UserSideBar />
              : ''
            }
          </div>
          <div className="h-20"></div>
          <div className="bg-gray-100 col-start-3 col-span-6">
            <Switch>
              {routes.map((route) => (
                <AppRoute
                  key={route.path}
                  path={route.path}
                  component={route.component}
                  isPrivate={route.isPrivate}
                />
              ))}
            </Switch>
          </div>
        </div>
      </Router>
    </AuthProvider>

  )
}

export default App
