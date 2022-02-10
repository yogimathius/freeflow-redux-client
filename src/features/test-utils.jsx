// test-utils.jsx
import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
// Import your own reducer
import usersReducer from '../reducers/usersSlice'
import userLoginSlice from '../reducers/userLoginSlice'
import userSkillsReducer from '../reducers/userSkillsSlice'

function render (
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: { users: usersReducer, user: userLoginSlice, user_skills: userSkillsReducer }, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper ({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }
