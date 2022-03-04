import { cleanup } from '@testing-library/react'
import React from 'react'
import 'regenerator-runtime/runtime'

import { renderWithRedux } from '../../../../../../test-utils'
import PostExcerptSkills from '../PostExcerptSkills'

afterEach(cleanup)

// Disable API mocking after the tests are done.

describe('PostExcerptSkills', () => {
  test('renders the PostExcerptSkills component on the PostExcerpt without crashing', async () => {
    renderWithRedux(
      <PostExcerptSkills postSkillIds={[1]} />)
  })
})
