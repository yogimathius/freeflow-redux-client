import { render, fireEvent, waitFor, cleanup } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import React from 'react'
import 'regenerator-runtime/runtime'

import { renderWithRedux } from '../../test-utils'
import PostExcerpt from '../PostExcerpt'
import PostsList from '../PostsList'
import { VisiblePostsList } from '../VisiblePostsList'

export const handlers = [
  rest.get('https://freeflow-two-point-o.herokuapp.com/api/posts', (req, res, ctx) => {
    return res(
      ctx.json(
        [
          {
            id: 1,
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
  rest.get('https://freeflow-two-point-o.herokuapp.com/api/comments', (req, res, ctx) => {
    return res(
      ctx.json(
        [
          {
            active: true,
            commenter_id: 5,
            first_name: 'Jennilee',
            id: 2,
            last_name: 'Zoppo',
            post_id: 10,
            text_body: 'Aenean sit amet justo.',
            time_posted: '2021-02-05T14:14:06.000Z',
            length: 1
          }
        ]
      )
    )
  }),
  rest.get('https://freeflow-two-point-o.herokuapp.com/api/db_skills', (req, res, ctx) => {
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
  rest.get('https://freeflow-two-point-o.herokuapp.com/api/user_skills', null)

  // rest.post('https://freeflow-two-point-o.herokuapp.com/api/', (req, res, ctx) => {
  //   const { username, password } = req.body
  //   return res(
  //     ctx.json({
  //       username
  //     })
  //   )
  // })
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

describe('Home Page', () => {
  test.skip('renders the PostsList on the home page without crashing', async () => {
    const postId = 1
    const onPost = jest.fn()
    const index = 1
    renderWithRedux(<PostExcerpt postId={postId} onPost={onPost} index={index} />)
  })
})
