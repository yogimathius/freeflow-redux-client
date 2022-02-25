import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import 'regenerator-runtime/runtime'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import { screen } from '@testing-library/dom'

import { shallow, mount } from 'enzyme'
import { renderWithRedux, mockStore } from '../../test-utils'
import LoginForm from '../LoginForm'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import { fireEvent, waitFor, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

// We use msw to intercept the network request during the test,
// and return the response null
// when receiving a get request to the `/api/user_skills` endpoint
export const handlers = [
  rest.get('https://freeflow-two-point-o.herokuapp.com/api/user_skills', null),
  rest.get('https://freeflow-two-point-o.herokuapp.com/api/db_skills', null),
  rest.get('https://freeflow-two-point-o.herokuapp.com/api/messages/unread_count', null),
  rest.post('https://freeflow-two-point-o.herokuapp.com/api/login-real', (req, res, ctx) => {
    const { username, password } = req.body
    return res(
      ctx.json({
        username
      })
    )
  })
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

describe('User Login Page', () => {
  test('fails to login without providing a username', async () => {
    const { getByTestId, getByLabelText, getByRole } = renderWithRedux(<LoginForm />)

    await act(async () => {
      userEvent.type(getByLabelText(/password/i), 'Dee')

      userEvent.click(getByRole('button', { name: /Login/i }))
    })

    expect(getByTestId('usernameError')).toBeTruthy()
    expect(getByTestId('usernameError')).toHaveTextContent('*Required*')
  })

  test('fails to login without providing a password', async () => {
    const { getByTestId, getByLabelText, getByRole } = renderWithRedux(<LoginForm />)

    await act(async () => {
      userEvent.type(getByLabelText(/username/i), 'Dee')

      userEvent.click(getByRole('button', { name: /Login/i }))
    })

    expect(getByTestId('passwordError')).toBeTruthy()
    expect(getByTestId('passwordError')).toHaveTextContent('*Required*')
  })

  test('calls on login submitted when username and password is valid', async () => {
    const handleLogin = jest.fn()

    const { getByLabelText, getByText } = renderWithRedux(<Provider store={mockStore}><LoginForm handleLogin={handleLogin} />
     </Provider>)

    await act(async () => {
      fireEvent.change(getByLabelText(/username/i), { target: { value: 'Dee' } })
      fireEvent.change(getByLabelText(/password/i), { target: { value: 'password' } })
    })

    fireEvent.click(getByText('Login'))

    await waitFor(() => {
      expect(handleLogin).toHaveBeenCalledOnce()
    })
  })
})
