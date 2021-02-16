import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import {logout} from '../features/login/userLoginSlice'
import { saveState } from '../helpers/localStorage'
import logo from '../images/logo.png'
import DropDown from './DropDown';

export const Navbar = () => {
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory();
  
  const handleLogout = () => {
    dispatch(logout())
    history.push("/login")
  }

  return (
    <nav className="pt-3 pb-1 mb-4 bg-green-500 fixed w-full z-40">
      <section className="grid grid-cols-4 ">
        <div className="flex ml-6 my-1 md:ml-12">
          <Link to="/dashboard">
            <img width="75px" className="" src={logo}  alt="freeflow logo"></img>
          </Link>
        </div>

        <div className="col-start-4 mr-4 md:hidden z-50 flex items-center">
          <DropDown user={user} saveState={saveState} handleLogout={handleLogout} />
        </div>
        <div className="col-span-3 hidden md:flex justify-evenly my-2 space-x-2 font-bold items-end ">
          <Link className="text-white col-start-1 flex justify-center" to="/dashboard">Posts</Link>
          <Link className="text-white col-start-2 flex justify-center" to="/users">Users</Link>
          <Link className="text-white col-start-3 flex justify-center" to={`/userprofile/${user?.id}`} onClick={() => saveState(user?.id)}>Profile</Link>
          <Link className="text-white col-start-4 flex justify-center" to={`/${user?.id}/experiences`} onClick={() => saveState(user?.id)}>Experiences</Link>
          <div className="text-white col-start-5 flex justify-center">
          {!user  ?
            <Link to="/login">Login</Link>
            :
            <button className="font-bold" onClick={() => handleLogout()}>Logout</button>
          }

          </div>
        </div>
      </section>
    </nav>
  )
}
