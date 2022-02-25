import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'
import { fetchUsers } from './reducers/usersSlice'
import { fetchPosts } from './reducers/postsSlice'
import { fetchSkills } from './reducers/dbSkillsSlice'
// import { fetchSkills } from './features/dbSkills/dbSkillsSlice'
import axios from 'axios'
import { fetchConversations } from './reducers/userConversationsSlice'
import { fetchComments } from './reducers/commentsSlice'
const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0].id : ''

store.dispatch(fetchSkills())
store.dispatch(fetchUsers())
store.dispatch(fetchPosts())
store.dispatch(fetchConversations(userId))
store.dispatch(fetchComments())
// store.dispatch(fetchSkills())

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL
}

ReactDOM.render(
  <Provider store={store} className="bg-gray-400 overflow-hidden h-screen">
    <App />
  </Provider>,
  document.getElementById('root')
)
