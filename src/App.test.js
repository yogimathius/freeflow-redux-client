import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import 'regenerator-runtime/runtime'

// We're using our own custom render function and not RTL's render.
// Our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render } from './features/test-utils'
import App from './App'

jest.mock('@material-ui/icons', () => {
  const icons = {
    __esModule: true
  }

  const handler = {
    get: function (_, prop) {
      return () => (
      <div className={`mock_${prop}Icon`} />)
    }
  }

  return new Proxy(icons, handler)
})
// We use msw to intercept the network request during the test,
// and return the response null
// when receiving a get request to the `/api/user_skills` endpoint
export const handlers = [
  rest.get('https://freeflow-two-point-o.herokuapp.com/api/user_skills', null)
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

test('Renders the app without crashing', async () => {
  render(<App />)
})
