import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAllUsers } from './usersSlice'
import store from '../../app/store';
import { 
  fetchKarmas, 
  selectAllkarmas,  
} from '../karmas/karmasSlice';
import './UsersList.scss';
import UserCard from './UserCard';
  
store.dispatch(fetchKarmas());
export const UsersList = () => {
  const dispatch = useDispatch()
  // console.log("karmas: ", store.getState().karmas)
  const users = useSelector(selectAllUsers)
  const karmas = useSelector (selectAllkarmas)
  // console.log("karmas in userlist: ", karmas);
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
    karmas={karmas}
    />
  ))

  // const userIds = users.map(user => user.id)
  // console.log(userIds);


  // karmas.map(karma => console.log("karmas: ", karma))
  // const renderedUsers = users.map((user) => {
  //   // const userKarmas = karmas.filter(karma => karmas.receiver_id = user.id)
  //   // console.log("count in users: ", userKarmas.length);
  //   // const userKarmasCount = userKarmas.length
  //   return (
  //     <li key={user.id}>
  //       <Link to={`/users/${user.id}`}>{user.first_name} {user.last_name}</Link>
  //       {/* <p>{userKarmasCount}</p> */}
  //     </li>
  //   )
  // } )


  const karmaStatus = useSelector((state) => state.karmas.status)
  const karmaError = useSelector((state) => state.karmas.error)

  useEffect(() => {
    if (karmaStatus === 'idle') {
      dispatch(fetchKarmas())
    }
  }, [karmaStatus, dispatch])

  let karmasContent

  if (karmaStatus === 'loading') {
    karmasContent = <div className="loader">Loading...</div>
  } else if (karmaStatus === 'succeeded') {
    karmasContent = karmas
  } else if (karmaStatus === 'failed') {
    karmasContent = <div>{karmaError}</div>
  }
  
  // console.log("karma content: ", karmasContent);
  return (
    <section>
      <h2>Users</h2>
      {renderedUsers}
    </section>
  )
}
