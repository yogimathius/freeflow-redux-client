import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'
import { AuthProvider } from './Context';
import routes from './Config/routes.js';
import { Navbar } from './components/Navbar'
import AppRoute from './components/AppRoute';

function App() {
  console.log(routes);
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="App">
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
