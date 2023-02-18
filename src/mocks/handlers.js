import { rest } from 'msw'

export const handlers = [
  rest.get('/api/user_skills', null),
  rest.get('/api/db_skills', (req, res) => {
    return res.json(
      {
        id: 1,
        skill_category_id: 1,
        name: 'Research'
      })
  }),
  rest.get('/api/user_skills', null),
  rest.get('/api/messages/unread_count', null),
  rest.post('/api/login-real', (req, res, ctx) => {
    const { username, password } = req.body
    return res(
      ctx.json({
        username
      })
    )
  }),
  rest.get('/api/posts', (req, res) => {
    return res.json(
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
          skill_ids: [16]
        }
      ]
    )
  }),
  rest.get('/api/comments', null),
  rest.get('/api/db_skills', null)
]
