import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'
import { AuthProvider } from './Context';
import routes from './Config/routes.js';
import { Navbar } from './components/Navbar'
import SideBar from './components/SideBar'

import AppRoute from './components/AppRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        {/* <SideBar /> */}
        <div className="App bg-gray-100 lg:w-11/12 mx-auto xl:w-2/3">
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
      </Router>
    </AuthProvider>

  )
}

export default App
