import React from 'react'
import 'regenerator-runtime/runtime'
import { renderWithRedux } from '../../../../../../test-utils'
import UserInfo from '../UserInfo'

describe('UserInfo', () => {
  test('renders the UserInfo component without crashing', async () => {
    renderWithRedux(<UserInfo />)
  })
})
