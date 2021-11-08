import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllUsers } from '../../reducers/usersSlice'
import store from '../../app/store'
import {
  fetchExperiences,
  selectAllExperiences
} from '../../reducers/experiencesSlice'
import UserCard from './UserCard'
import UserSkillsList from '../userSkills/fetchUserSkills'

store.dispatch(fetchExperiences())
export const UsersList = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)
  const experiences = useSelector(selectAllExperiences)

  const experienceStatus = useSelector((state) => state.experiences.status)
  const experienceError = useSelector((state) => state.experiences.error)

  useEffect(() => {
    if (experienceStatus === 'idle') {
      dispatch(fetchExperiences())
    }
  }, [experienceStatus, dispatch])

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
      <div key={id} className="">
        <UserCard
          key={id}
          id={user.id}
          firstName={user.first_name}
          lastName={user.last_name}
          active={user.active}
          location={user.location}
          created_at={user.created_at}
          profession={user.profession}
          tagline={user.tagline}
          position="right"
        />
      </div>
    )
  })

  return (
    <section className="space-y-3 pt-3 mt-2 m-4">
      <h2 className="text-2xl font-bold text-center text-green-500">Users</h2>
      <div className="grid grid-cols-2 gap-y-2">
        {renderedUsers}
      </div>
    </section>
  )
}
