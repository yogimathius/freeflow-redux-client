import { cleanup } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import React from 'react'
import 'regenerator-runtime/runtime'

import { renderWithRedux } from '../../test-utils'
import { VisiblePostsList } from '../VisiblePostsList'

export const handlers = [
  rest.get('/api/posts', (req, res, ctx) => {
    return res(
      ctx.json(
        [
          {
            id: 15,
            owner_id: 2,
            text_body: 'I need some help with my italian cuisine skills',
            first_name: 'Derril',
            last_name: 'Sleaford',
            time_posted: '2021-07-24T03:14:56.354Z',
            status_field: 'active',
            active: false,
            skill_ids: [
              16
            ]
          }
        ]
      )
    )
  }),
  rest.get('/api/comments', null),
  rest.get('/api/db_skills', (req, res, ctx) => {
    return res(
      ctx.json(
        [
          {
            id: 1,
            skill_category_id: 1,
            name: 'Research'
          }
        ]
      )
    )
  }),
  rest.get('/api/user_skills', null)
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => {
  server.listen()
})

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())
afterEach(cleanup)

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe('PostsList', () => {
  test('renders the PostsList on the home page without crashing', async () => {
    renderWithRedux(<VisiblePostsList />)
  })
})
