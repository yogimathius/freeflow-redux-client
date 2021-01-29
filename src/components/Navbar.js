import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './Navbar.scss';
// import {
//   fetchNotifications,
//   selectAllNotifications,
// } from '../features/notifications/notificationsSlice'

export const Navbar = () => {

  return (
    <nav>
      <section>
        <h1>Freeflow</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/dashboard">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/login">Login</Link>
            <Link to="/profile">Profile</Link>
          </div>
        </div>
      </section>
    </nav>
  )
}
