import 'regenerator-runtime'

import userLoginReducer, { login, logout } from '../userLoginSlice'

describe('userLoginSlice', () => {
  test('should return the initial state', () => {
    expect(userLoginReducer(undefined, {})).toEqual(
      {
        user: undefined
      }
    )
  })

  test('should create an action to login a user', () => {
    const payload = {
      username: 'dsleaford1',
      password: '4lGhIyW'
    }

    // THIS TEST NEEDS TO BE LOOKED INTO MORE AFTER THE AUTHENTICATION LOGIC HAS BEEN IMPROVED
    expect(userLoginReducer(undefined, login(payload))).toEqual({
      user: undefined
    })
  })

  test('should create an action to logout a user', () => {
    // THIS TEST NEEDS TO BE LOOKED INTO MORE AFTER THE AUTHENTICATION LOGIC HAS BEEN IMPROVED
    expect(userLoginReducer(undefined, logout())).toEqual({
      user: undefined
    })
  })
})
