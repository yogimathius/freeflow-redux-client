import React from 'react'
import selectEvent from 'react-select-event'
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { mount, shallow } from 'enzyme'

import { act } from 'react-dom/test-utils'
import 'regenerator-runtime/runtime'

import { mockStore, renderWithRedux } from '../../test-utils'
import AddPostForm from '../AddPostForm'
import { Provider } from 'react-redux'
import Select from 'react-select'
import SkillSelector from '../../dbSkills/SkillSelector'
import { setSelectedSkills } from '../../../reducers/selectedSkillsSlice'

export const handlers = [
  rest.get('https://freeflow-two-point-o.herokuapp.com/api/posts', (req, res, ctx) => {
    return res(
      ctx.json(
        [
          {
            id: 15,
            owner_id: 2,
            text_body: 'I need some help with my italian cuisine skills',
            first_name: 'Derril',
            last_name: 'Sleaford',
            time_posted: '2021-07-24T03:14:56.354Z',
            status_field: 'active',
            active: false,
            skill_ids: [
              16
            ]
          }
        ]
      )
    )
  }),
  rest.get('https://freeflow-two-point-o.herokuapp.com/api/comments', null),
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

jest.mock('react-select', () => ({ options, value, onChange }) => {
  function handleChange (event) {
    console.log('called')

    const option = options.find(option => {
      return option.value === event.currentTarget.value
    })

    onChange(option)
  }
  return (
    <select
      id="uc"
      data-testid="select"
      value={value}
      onChange={event => handleChange(event)}
    >
      {options?.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  )
})

describe('Home Page', () => {
  test('renders the AddPostForm without crashing', async () => {
    renderWithRedux(<AddPostForm />)
  })

  test('fails to create a post without any content or skills selected', async () => {
    const { getByTestId } = renderWithRedux(<AddPostForm />)

    await act(async () => {
      userEvent.click(getByTestId('sendButton'))
    })

    expect(getByTestId('errorMessage')).toBeTruthy()
  })

  test('fails to create a post without any content or skills selected', async () => {
    const { getByTestId, getByLabelText, getByRole } = renderWithRedux(<AddPostForm />)
    await act(async () => {
      userEvent.click(getByTestId('sendButton'))
    })

    expect(getByTestId('errorMessage')).toBeTruthy()
    expect(getByTestId('errorMessage')).toHaveTextContent('Post cannot be blank')
  })

  test('fails to create a post without selecting any skills', async () => {
    const { getByTestId } = renderWithRedux(<AddPostForm />)
    userEvent.type(getByTestId('postText'), 'tesa')

    await act(async () => {
      userEvent.click(getByTestId('sendButton'))
    })

    expect(getByTestId('errorMessage')).toBeTruthy()
    expect(getByTestId('errorMessage')).toHaveTextContent('Please select a skill')
  })

  test.skip('successfully calls OnSavePostClicked with content and one skill selected', async () => {
    const selectedSkills = {
      options: [{
        label: 'Cooking',
        value: 'Cooking'
      }]
    }

    const {
      getByTestId,
      queryAllByTestId
    } = renderWithRedux(
      <AddPostForm />,
      { initialState: selectedSkills }
    )

    const selectOptions = queryAllByTestId('selector')

    userEvent.type(getByTestId('postText'), 'tesa')

    await act(async () => {
      userEvent.click(getByTestId('sendButton'))
    })

    expect(getByTestId('errorMessage')).toBeNull()
  })

  test.skip('successfully calls OnSavePostClicked with content and one skill selected with mount', async () => {
    localStorage.setItem('selected_skills', [1])

    const selectedSkills = {
      options: [{
        label: 'Cooking',
        value: 'Cooking'
      }]
    }

    const wrapper = mount(<Provider store={mockStore}><AddPostForm selectedSkills={{ selectedSkills }} /></Provider>)

    const selector = wrapper.find(SkillSelector) // you can use 'input' instead of '.Select-control'

    // wrapper.find(SkillSelector).simulate('keyDown', { keyCode: 40 }) // you can use 'input' instead of '.Select-control'
    // wrapper.find(Select).simulate('keyDown', { keyCode: 13 })

    await act(async () => {
      expect(wrapper.find('.errorMessage')).toHaveTextContent('')
    })
  })
})
