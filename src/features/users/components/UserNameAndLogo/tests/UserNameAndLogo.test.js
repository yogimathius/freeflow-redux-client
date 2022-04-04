import React from 'react'
import 'regenerator-runtime/runtime'
import { renderWithRedux } from '../../../../test-utils'
import UserNameAndLogo from '../UserNameAndLogo'

describe('UserNameAndLogo', () => {
  test('renders the UserNameAndLogo component without crashing', async () => {
    renderWithRedux(<UserNameAndLogo />)
  })
})
