import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import {logout} from '../features/login/userLoginSlice'
import { saveState } from '../helpers/localStorage'

export const Navbar = () => {
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory();
  
  const handleLogout = () => {
    dispatch(logout())
    history.push("/login")
  }

  return (
    <nav className="pt-3 pb-1 mb-4 bg-green-500 fixed w-full z-50">
      <section className="grid grid-cols-4 grid-rows-2 ">
        <div className="col-span-4 flex justify-center ">
          <h1 className="text-white text-2xl font-extrabold">Freeflow Social Network</h1>
        </div>

        <div className="row-start-2 col-span-4 grid grid-cols-5 my-2 space-x-2 font-bold items-end">
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
