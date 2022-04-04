import React from 'react'
import 'regenerator-runtime/runtime'

import { renderWithRedux } from '../../test-utils'
import { UsersList } from '../UsersList'

const mockState = {
  posts: {
    ids: [1],
    entities: {
      1: {
        id: 1,
        first_name: 'Mathius',
        last_name: 'Johnson',
        location: 'Fajã de Cima',
        username: 'mjachievem',
        helperrating: '140',
        helpedrating: '140',
        active: true,
        profession: 'Web Developer',
        tagline: 'This web app is going ,to be awesome when its complete!'
      }
    },
    error: null,
    status: 'succeeded'
  },
  experiences: {
    ids: [1],
    entities: {
      1: {
        id: 1,
        helper_id: 1,
        helped_id: 1,
        creator_id: 1,
        creator_message: 'Integer ,tincidunt ante vel ipsum.',
        post_id: 1,
        status: 'completed',
        date_initiated: '2020-05-07T16:4,2:23.000Z',
        date_accepted: '2020-06-03T18:29,:05.000Z',
        date_completed: '2020-07-27T17:0,4:36.000Z',
        receiver_seen: false,
        helper_submit_completion: false,
        helped_submit_completion: false,
        helper: 'Charleen James',
        helped: 'Mathius Johnson'
      }
    },
    error: null,
    status: 'succeeded'
  },
  user: {
    user: {
      id: 1,
      username: 'username',
      avatar: 'avatarurl'
    }
  }
}

describe('UsersList', () => {
  test('renders the UsersList on the home page without crashing', async () => {
    renderWithRedux(<UsersList />, { preloadedState: mockState })
  })
})
