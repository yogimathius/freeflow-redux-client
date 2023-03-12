import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'
import axios from 'axios'

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:8080/'
} else if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL
}

// // Start the mocking conditionally.
// if (process.env.NODE_ENV === 'development') {
//   const { worker } = require('./mocks/browser')
//   worker.start()
// }

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
