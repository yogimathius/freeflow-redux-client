const ROOT_URL = '/api/login/'

export async function loginUser (dispatch, loginPayload) {
  const requestOptions = {
    method: 'POST',
    mode: 'no-cors',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayload)
  }

  try {
    dispatch({ type: 'REQUEST_LOGIN' })
    const response = await fetch(ROOT_URL, requestOptions)
    const data = await response.json()
    if (data.username) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data })
      localStorage.setItem('currentUser', JSON.stringify(data))
      return data
    }

    dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] })
    return
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error })
  }
}

export async function logout (dispatch) {
  dispatch({ type: 'LOGOUT' })
  localStorage.removeItem('currentUser')
  localStorage.removeItem('token')
}
