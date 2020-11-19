import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAllUsers } from './usersSlice'
import store from '../../app/store';
import { 
  fetchKarmas, selectAllkarmas,  } from '../posts/karmas/karmasSlice';

store.dispatch(fetchKarmas());

export const UsersList = () => {
  const dispatch = useDispatch()
  // console.log("karmas: ", store.getState().karmas)
  const users = useSelector(selectAllUsers)


  // const userIds = users.map(user => user.id)
  // console.log(userIds);
  const karmas = useSelector (selectAllkarmas)
  console.log("karmas in userlist: ", karmas);

  // karmas.map(karma => console.log("karmas: ", karma))
  const renderedUsers = users.map((user) => {
    // const userKarmas = karmas.filter(karma => karmas.receiver_id = user.id)
    // console.log("count in users: ", userKarmas.length);
    // const userKarmasCount = userKarmas.length
    return (
      <li key={user.id}>
        <Link to={`/users/${user.id}`}>{user.first_name} {user.last_name}</Link>
        {/* <p>{userKarmasCount}</p> */}
      </li>
    )
  } )


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

      <ul>{renderedUsers}</ul>
    </section>
  )
}
