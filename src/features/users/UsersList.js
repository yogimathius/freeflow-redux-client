import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllUsers, fetchUsers } from '../../reducers/usersSlice'
import {
  fetchExperiences,
  selectAllExperiences
} from '../../reducers/experiencesSlice'
import UserCard from './components/UserCard/UserCard'

export const UsersList = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)
  const experiences = useSelector(selectAllExperiences)

  const experienceStatus = useSelector((state) => state.experiences.status)
  const experienceError = useSelector((state) => state.experiences.error)

  let experiencesContent

  if (experienceStatus === 'loading') {
    experiencesContent = <div className="loader">Loading...</div>
  } else if (experienceStatus === 'succeeded') {
    experiencesContent = experiences
  } else if (experienceStatus === 'failed') {
    // eslint-disable-next-line no-unused-vars
    experiencesContent = <div>{experienceError}</div>
  }

  const renderedUsers = users.map((user, id) => {
    return (
      <div key={id} className="gap-2 border-1 border-gray-200 rounded-lg">
        <UserCard
          key={id}
          user={user}
          infoPosition="right"
          isList={true}
        />
      </div>
    )
  })

  return (
    <section className="space-y-3 pt-3 mx-4 mt-16">
      <div className="grid lg:grid-cols-2 gap-4">
        {renderedUsers}
      </div>
    </section>
  )
}
