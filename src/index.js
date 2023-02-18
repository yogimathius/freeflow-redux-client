import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'
import { fetchUsers } from './reducers/usersSlice'
import { fetchSkills } from './reducers/dbSkillsSlice'
// import { fetchSkills } from './features/dbSkills/dbSkillsSlice'
import axios from 'axios'
import { fetchConversations } from './reducers/userConversationsSlice'
import { fetchComments } from './reducers/commentsSlice'
const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : ''

if (userId) {
  store.dispatch(fetchConversations(userId))
}

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL
}

// // Start the mocking conditionally.
// if (process.env.NODE_ENV === 'development') {
//   const { worker } = require('./mocks/browser')
//   worker.start()
// }

ReactDOM.render(
  <Provider store={store} className="bg-gray-400 overflow-hidden h-screen">
    <App />
  </Provider>,
  document.getElementById('root')
)
