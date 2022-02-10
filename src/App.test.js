/**
 * @jest-environment jsdom
 */

import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import 'regenerator-runtime/runtime'
import { CSSTransition } from 'react-transition-group'

// We're using our own custom render function and not RTL's render.
// Our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, screen } from './features/test-utils'
import App from './App'

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
export const handlers = [
  // rest.get('/api/user', (req, res, ctx) => {
  //   return res(ctx.json('John Smith'), ctx.delay(150))
  // }),
  rest.get('https://freeflow-two-point-o.herokuapp.com/api/user_skills', null)
]

function Fade ({ children, ...props }) {
  return (
    <CSSTransition {...props} timeout={1000} classNames="fade">
      {children}
    </CSSTransition>
  )
}

jest.mock('react-transition-group', () => {
  const FakeCSSTransition = jest.fn(() => null)
  return { CSSTransition: FakeCSSTransition }
})

jest.mock('@material-ui/core/styles', () => ({
  withStyles: styles => component => component
}))
/**
 * @jest-environment jsdom
 */

jest.mock('@material-ui/icons', () => {
  const icons = {
    __esModule: true
  }

  const handler = {
    get: function (_, prop) {
      return () => <div className={`mock_${prop}Icon`} />
    }
  }

  return new Proxy(icons, handler)
})

jest.mock('@material-ui/core/Menu')
jest.mock('@material-ui/core/MenuItem')
jest.mock('@material-ui/core/ListItemIcon')
jest.mock('@material-ui/core/ListItemText')
jest.mock('@material-ui/core/Button')

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => {
  const localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
  }
  globalThis.localStorage = localStorage

  server.listen()
})

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

test('Renders the app without crashing', async () => {
  render(<App />)
})
