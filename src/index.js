import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'
import { fetchUsers } from './features/users/usersSlice'
import { fetchPosts } from './features/posts/postsSlice'
import { fetchSkills } from './features/dbSkills/dbSkillsSlice'
// import { fetchSkills } from './features/dbSkills/dbSkillsSlice'
import axios from 'axios'

store.dispatch(fetchSkills())
store.dispatch(fetchUsers())
store.dispatch(fetchPosts())

// store.dispatch(fetchSkills())

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} className="bg-gray-400 overflow-hidden h-screen">
      <App />

    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
