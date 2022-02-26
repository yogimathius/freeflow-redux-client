import React from 'react'
import 'regenerator-runtime/runtime'

import { renderWithRedux } from '../../test-utils'
import LoginPage from '../LoginPage'

describe('User Login Page', () => {
  test('renders the login page without crashing', async () => {
    renderWithRedux(<LoginPage />)
  })
})
