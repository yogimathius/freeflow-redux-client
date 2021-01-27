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
  // console.log("experiences in userlist: ", experiences);
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
    experiences={experiences}
    />
  ))

  // const userIds = users.map(user => user.id)
  // console.log(userIds);


  // experiences.map(karma => console.log("experiences: ", karma))
  // const renderedUsers = users.map((user) => {
  //   // const userKarmas = experiences.filter(karma => experiences.receiver_id = user.id)
  //   // console.log("count in users: ", userKarmas.length);
  //   // const userKarmasCount = userKarmas.length
  //   return (
  //     <li key={user.id}>
  //       <Link to={`/users/${user.id}`}>{user.first_name} {user.last_name}</Link>
  //       {/* <p>{userKarmasCount}</p> */}
  //     </li>
  //   )
  // } )


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
  
  // console.log("experience content: ", experiencesContent);
  return (
    <section>
      <h2>Users</h2>
      {renderedUsers}
    </section>
  )
}
