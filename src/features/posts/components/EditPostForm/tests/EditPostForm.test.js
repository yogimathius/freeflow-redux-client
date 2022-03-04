import React from 'react'
import { cleanup, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { act } from 'react-dom/test-utils'
import 'regenerator-runtime/runtime'

import { renderWithRedux } from '../../../../test-utils'
import { EditPostForm } from '../EditPostForm'

const mockState = {
  posts: {
    ids: [1],
    entities: {
      1: {
        id: 1,
        owner_id: 1,
        text_body: 'I need some help with my italian cuisine skills',
        first_name: 'Derril',
        last_name: 'Sleaford',
        time_posted: '2021-07-24T03:14:56.354Z',
        status_field: 'active',
        active: false,
        skill_ids: [
          1
        ]
      }
    },
    error: null,
    status: 'succeeded'
  }
}

export const handlers = [
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
  rest.put('https://freeflow-two-point-o.herokuapp.com/api/posts', true)
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => {
  server.listen()
})

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(() => null),
      setItem: jest.fn(() => null)
    },
    writable: true
  })
})

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())
afterEach(cleanup)

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe('EditPostForm', () => {
  test('renders the EditPostForm without crashing', async () => {
    const OnEditPostClicked = jest.fn()

    renderWithRedux(<EditPostForm OnEditPostClicked={OnEditPostClicked} />)
  })

  test('loads the EditPostForm with preloaded value', async () => {
    const OnEditPostClicked = jest.fn()
    const value = 'Test'
    const { getByTestId } = renderWithRedux(
      <EditPostForm
        OnEditPostClicked={OnEditPostClicked}
        value={value} />)

    expect(getByTestId('postContent')).toHaveTextContent(value)
  })

  test('fails to save a post when there is no content', async () => {
    const OnEditPostClicked = jest.fn()

    const { getByTestId } = renderWithRedux(
      <EditPostForm
        OnEditPostClicked={OnEditPostClicked}
      />
    )

    expect(getByTestId('postContent')).toHaveTextContent('')

    userEvent.click(getByTestId('saveButton'))

    expect(getByTestId('errorMessage')).toHaveTextContent('Post cannot be blank')

    expect(OnEditPostClicked).not.toHaveBeenCalled()
  })

  test('successfully calls OnEditPostClicked after updating content', async () => {
    const onEditPostClicked = jest.fn()
    const onSaveEdit = jest.fn()
    const value = 'Test'

    const { getByTestId } = renderWithRedux(
      <EditPostForm
        postId={1}
        onSaveEdit={onSaveEdit}
        onEditPostClicked={onEditPostClicked}
        value={value} />,
      { preloadedState: mockState }
    )

    userEvent.type(getByTestId('postContent'), 'test changed')

    await act(async () => {
      userEvent.click(getByTestId('saveButton'))
    })

    expect(getByTestId('errorMessage')).toHaveTextContent('')
    expect(onEditPostClicked).toHaveBeenCalled()
  })
})
