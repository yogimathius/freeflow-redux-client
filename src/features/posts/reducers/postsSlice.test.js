import 'regenerator-runtime'

import postsReducer, { fetchPosts, addNewPost, removePost, updatePost } from './postsSlice'

const oldPost = {
  id: 1,
  owner_id: 5,
  text_body: 'I need a website.',
  first_name: 'Jennilee',
  last_name: 'Zoppo',
  time_posted: '2021-01-16T19:59:23,.000Z',
  status_field: 'active',
  active: true,
  skill_ids: { 0: 3, 1: 2, 2: 6 }
}

const previousState = {
  entities: {
    1: oldPost
  },
  error: null,
  ids: [1],
  status: 'idle'
}

describe('postsSlice', () => {
  test('should return the initial state', () => {
    expect(postsReducer(undefined, {})).toEqual(
      {
        entities: {},
        error: null,
        ids: [],
        status: 'idle'
      }
    )
  })

  test('should create an action to fetch posts', () => {
    expect(postsReducer(previousState, fetchPosts())).toEqual({
      entities: {
        1: {
          id: 1,
          owner_id: 5,
          text_body: 'I need a website.',
          first_name: 'Jennilee',
          last_name: 'Zoppo',
          time_posted: '2021-01-16T19:59:23,.000Z',
          status_field: 'active',
          active: true,
          skill_ids: { 0: 3, 1: 2, 2: 6 }
        }
      },
      error: null,
      ids: [1],
      status: 'idle'
    })
  })

  test('should create an action to add a new post', () => {
    const timePosted = new Date().toISOString()
    const newPost = {
      text_body: 'test',
      is_helper: true,
      is_helped: false,
      active: true,
      time_posted: timePosted,
      avatar: 'dummy avatar',
      owner_id: 1,
      username: 'test',
      id: 2,
      skill_ids: [2]
    }

    expect(postsReducer(previousState, addNewPost.fulfilled(newPost))).toEqual({
      entities: {
        1: oldPost,
        2: newPost
      },
      error: null,
      ids: [1, 2],
      status: 'idle'
    })
  })

  test('should create an action to remove a post', () => {
    const newState = {
      meta: {
        arg: {
          post_id: 1
        }
      }
    }

    const test = 'test'
    const post_id = 1
    expect(postsReducer(previousState, removePost.fulfilled(post_id, { post_id }, post_id))).toEqual({
      entities: {
      },
      error: null,
      ids: [],
      status: 'idle'
    })
  })
})
