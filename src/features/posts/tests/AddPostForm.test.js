import React from 'react'
import { cleanup, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { act } from 'react-dom/test-utils'
import 'regenerator-runtime/runtime'

import { renderWithRedux } from '../../test-utils'
import AddPostForm from '../AddPostForm'

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
  })
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

describe('Home Page', () => {
  test('renders the AddPostForm without crashing', async () => {
    const OnSavePostClicked = jest.fn()

    renderWithRedux(<AddPostForm OnSavePostClicked={OnSavePostClicked} />)
  })

  test('fails to create a post without any content or skills selected', async () => {
    const OnSavePostClicked = jest.fn()

    const { getByTestId, getByLabelText, getByRole } = renderWithRedux(<AddPostForm OnSavePostClicked={OnSavePostClicked} />)
    userEvent.click(getByTestId('sendButton'))

    expect(OnSavePostClicked).not.toHaveBeenCalled()
    expect(getByTestId('errorMessage')).toHaveTextContent('Post cannot be blank')
  })

  test('fails to create a post without selecting any skills', async () => {
    const OnSavePostClicked = jest.fn()

    const { getByTestId } = renderWithRedux(<AddPostForm OnSavePostClicked={OnSavePostClicked} />)
    userEvent.type(getByTestId('postText'), 'tesa')

    userEvent.click(getByTestId('sendButton'))

    await waitFor(() => getByTestId('errorMessage'), getByTestId('postText'))

    await waitFor(() => getByTestId('errorMessage'))

    expect(getByTestId('errorMessage')).toHaveTextContent('Please select a skill')
    expect(OnSavePostClicked).not.toHaveBeenCalled()
  })

  test('successfully calls OnSavePostClicked with content and one skill selected', async () => {
    const OnSavePostClicked = jest.fn()

    const selectedSkills = {
      selectedSkills: [{
        label: 'Cooking',
        value: 'Cooking'
      }]
    }

    const {
      getByTestId,
      queryAllByTestId
    } = renderWithRedux(
      <AddPostForm OnSavePostClicked={OnSavePostClicked} />,
      { preloadedState: selectedSkills }
    )

    userEvent.type(getByTestId('postText'), 'tesa')

    await act(async () => {
      userEvent.click(getByTestId('sendButton'))
    })
    await waitFor(() => getByTestId('errorMessage'))

    expect(getByTestId('errorMessage')).toHaveTextContent('')
    expect(OnSavePostClicked).toHaveBeenCalled()
  })
})
