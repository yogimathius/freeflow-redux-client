import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllUsers } from './usersSlice'
import store from '../../app/store';
import { 
  fetchExperiences, 
  selectAllExperiences,  
} from '../experiences/experiencesSlice';
import './UsersList.scss';
import UserCard from './UserCard';
  
store.dispatch(fetchExperiences());
export const UsersList = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)
  const experiences = useSelector (selectAllExperiences)

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
    experiencesContent = <div>{experienceError}</div>
  }
  const renderedUsers = users.map((user, id) => (
    <UserCard 
    key={id} 
    id={user.id} 
    avatar={user.avatar} 
    firstName={user.first_name} 
    lastName={user.last_name} 
    description={user.description} 
    active={user.active} 
    location={user.location} 
    created_at={user.created_at} 
    experiences={experiencesContent}
    />
  ))

    return (
    <section>
      <h2>Users</h2>
      {renderedUsers}
    </section>
  )
}
