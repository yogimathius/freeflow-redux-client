// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
import 'jest-localstorage-mock'
import '@testing-library/jest-dom'
// setup file
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import * as matchers from 'jest-extended'

import { server } from './mocks/server'

beforeAll(() => {
  // Enable the mocking in tests.
  server.listen()
})

afterEach(() => {
  // Reset any runtime handlers tests may use.
  server.resetHandlers()
})

afterAll(() => {
  // Clean up once the tests are done.
  server.close()
})

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
}
global.localStorage = localStorageMock

configure({ adapter: new Adapter() })

// add all jest-extended matchers
expect.extend(matchers)
