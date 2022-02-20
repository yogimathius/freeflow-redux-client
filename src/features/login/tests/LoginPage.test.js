import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import 'regenerator-runtime/runtime'
import { screen } from '@testing-library/react'
import { Field, Form, Formik } from 'formik'

// We're using our own custom render function and not RTL's render.
// Our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render } from '../../test-utils'
import LoginPage from '../LoginPage'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'

// We use msw to intercept the network request during the test,
// and return the response null
// when receiving a get request to the `/api/user_skills` endpoint
export const handlers = [
  rest.get('https://freeflow-two-point-o.herokuapp.com/api/user_skills', null),
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

// Disable API mocking after the tests are done.
afterAll(() => server.close())

test('makes a post request to login a user', async () => {
  const onLoginSubmitted = jest.fn()
  const { getByTestId, getByText } = render(<LoginPage />)
  // const errorMsg = screen.getByTestId('error')
  userEvent.type(screen.getByLabelText(/username/i), '')
  userEvent.type(screen.getByLabelText(/password/i), 'Dee')
  await act(async () => {
    userEvent.click(screen.getByRole('button', { name: /Login/i }))
  })

  expect(getByTestId('error')).toBeTruthy()

  const errorMsg = getByText('***Username cannot be blank***')

  expect(errorMsg).toBeTruthy()

  userEvent.type(screen.getByLabelText(/username/i), 'John')

  await act(async () => {
    userEvent.click(screen.getByRole('button', { name: /Login/i }))
  })
})
