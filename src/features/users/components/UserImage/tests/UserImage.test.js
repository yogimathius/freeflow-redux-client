import React from 'react'
import 'regenerator-runtime/runtime'
import { renderWithRedux } from '../../../../test-utils'
import UserImage from '../UserImage'

describe('UserImage', () => {
  test('renders the UserImage component without crashing', async () => {
    renderWithRedux(<UserImage />)
  })
})
