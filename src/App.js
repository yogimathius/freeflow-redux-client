import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { AuthProvider } from './Context';

import { Navbar } from './app/Navbar'

import { PostsList } from './features/posts/PostsList'
import { AddPostForm } from './features/posts/AddPostForm'
import { EditPostForm } from './features/posts/EditPostForm'
import { SinglePostPage } from './features/posts/SinglePostPage'
import { UsersList } from './features/users/UsersList'
import { UserPage } from './features/users/UserPage'

import { UserProfile } from './features/users/UserProfile'
import LoginPage from './features/login/LoginPage'
import Login from './features/loginContent/Login'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <React.Fragment>
                  <AddPostForm />
                  <PostsList />
                </React.Fragment>
              )}
            />
            <Route exact path="/posts/:postId" component={SinglePostPage} />
            <Route exact path="/editPost/:postId" component={EditPostForm} />
            <Route exact path="/users" component={UsersList} />
            <Route exact path="/users/:userId" component={UserPage} />
            <Route exact path="/profile" component={UserProfile} />
            {/* <Route exact path="/notifications" component={NotificationsList} /> */}
            <Route exact path="/login" component={LoginPage} />

            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </AuthProvider>

  )
}

export default App
