import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'
import { useSelector } from 'react-redux';

import { AuthProvider } from './Context';
import routes from './Config/routes.js';
import { Navbar } from './components/Navbar'
// import SideBar from './components/SideBar'

import AppRoute from './components/AppRoute';
import UserSideBar from './features/users/UserSideBar';
// import Footer from './components/Footer';

function App() {
  const user = useSelector(state => state.user)

  return (
    <AuthProvider>
      <Router>
        {/* <SideBar /> */}

        <div className="App md:grid grid-cols-8 font-body">
          <Navbar />
          <div className="hidden md:col-span-2 md:flex justify-center">
            { user.user ? 
            <UserSideBar /> 
            : ""
            }
          </div>
          <div className="h-16"></div>
          <div className="bg-gray-100 col-start-3 col-span-4">
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
