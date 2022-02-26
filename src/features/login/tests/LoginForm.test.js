import React from 'react'
import 'regenerator-runtime/runtime'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import { renderWithRedux, mockStore } from '../../test-utils'
import LoginForm from '../LoginForm'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import { fireEvent, waitFor, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

afterEach(cleanup)

// Disable API mocking after the tests are done.

describe('User Login Form', () => {
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
