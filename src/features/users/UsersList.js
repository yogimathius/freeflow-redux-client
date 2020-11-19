import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from './usersSlice'
import './UsersList.scss';
import UserCard from './UserCard';

export const UsersList = () => {
  const users = useSelector(selectAllUsers)

  const renderedUsers = users.map((user) => (
    <UserCard id={user.id} avatar={user.avatar} firstName={user.first_name} lastName={user.last_name} description={user.description} active={user.active} location={user.location} created_at={user.created_at} />
  ))

  return (
    <section>
      <h2>Users</h2>
      {renderedUsers}
    </section>
  )
}
