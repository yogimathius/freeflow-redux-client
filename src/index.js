import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'
import { fetchUsers } from './features/users/usersSlice'
import { fetchPosts } from './features/posts/postsSlice'
import Footer from './components/Footer'
// import { fetchSkills } from './features/dbSkills/dbSkillsSlice'

store.dispatch(fetchUsers())
store.dispatch(fetchPosts())
// store.dispatch(fetchSkills())
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} className="bg-gray-400">
      <App />
      <Footer />

    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
