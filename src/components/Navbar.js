import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { logout } from '../reducers/userLoginSlice'
import { saveState } from '../helpers/localStorage'
import logo from '../images/logo.png'
import DropDown from './DropDown'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PersonIcon from '@material-ui/icons/Person'
import PeopleIcon from '@material-ui/icons/People'
import BarChartIcon from '@material-ui/icons/BarChart'
import PostAddIcon from '@material-ui/icons/PostAdd'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import { emptySkillsDB } from '../reducers/selectedSkillsSlice'

export const Navbar = (props) => {
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()
  const [currentPage, setCurrentPage] = useState('/')
  const handleLogout = () => {
    dispatch(logout())
    history.push('/login')
  }
  useEffect(() => {
    if (user === null || user === undefined) {
      setCurrentPage('login')
    }
  }, [user])

  const onDashboardClicked = () => {
    setCurrentPage('dashboard')
    dispatch(emptySkillsDB())
  }

  return (
    <nav className="pt-3 pb-1 mb-4 bg-green-500 fixed w-full z-40 font-body">
      <section className="grid grid-cols-8 ">
        <div className="col-span-2 ml-4 my-1 md:ml-12">
          <Link onClick={() => (setCurrentPage('dashboard'))} to="/dashboard">
            <img width="75px" className="" src={logo} alt="freeflow logo"></img>
          </Link>
        </div>

        <div className="col-start-7 mr-4 md:hidden z-50 flex items-center">
          <DropDown user={user} saveState={saveState} handleLogout={handleLogout} />
        </div>

        <div className="col-start-3 col-span-4 hidden md:flex justify-evenly my-2 space-x-12 font-bold items-end text-white">

          <Link onClick={() => (onDashboardClicked())} className="" to="/dashboard">
            <div className="flex group">
            <div className={`${currentPage === 'dashboard' ? 'border-b-2 border-white' : ''} group-hover:border-b-2 group-hover:border-white`}>
                <PostAddIcon />
              </div>
              <div className="flex items-end ml-1">
                Posts
              </div>
            </div>
          </Link>

          <Link onClick={() => (setCurrentPage('users'))} className="" to="/users">
            <div className="flex group">
            <div className={`${currentPage === 'users' ? 'border-b-2 border-white' : ''} group-hover:border-b-2 group-hover:border-white`}>
                <PeopleIcon />
              </div>
              <div className="flex items-end ml-1">
                Users
              </div>
            </div>
          </Link>

          <Link className="" to={`/userprofile/${user?.id}`} onClick={() => {
            saveState(user?.id)
            setCurrentPage('profile')
          }}>
            <div className="flex group">
            <div className={`${currentPage === 'profile' ? 'border-b-2 border-white' : ''} group-hover:border-b-2 group-hover:border-white`}>
                <PersonIcon />
              </div>
              <div className="flex items-end ml-1">
                Profile
              </div>
            </div>
          </Link>

          <Link className="" to={`/${user?.id}/experiences`} onClick={() => {
            saveState(user?.id)
            setCurrentPage('experiences')
          }}>
            <div className="flex group">
            <div className={`${currentPage === 'experiences' ? 'border-b-2 border-white' : ''} group-hover:border-b-2 group-hover:border-white`}>
                <BarChartIcon />
              </div>
              <div className="flex items-end ml-1">
                EXP
              </div>
              </div>
          </Link>

          <Link className="" to={'/messages'} onClick={() => {
            saveState(user?.id)
            setCurrentPage('messages')
          }}>
            <div className="flex group">
            <div className={`${currentPage === 'messages' ? 'border-b-2 border-white' : ''} group-hover:border-b-2 group-hover:border-white`}>
                <BarChartIcon />
              </div>
              <div className="flex items-end ml-1">
                Messages
              </div>
              </div>
          </Link>

          <div className="">
          {!user
            ? <Link to="/login">
              <div className="flex group">
              <div className={`${currentPage === 'login' ? 'border-b-2 border-white' : ''} group-hover:border-b-2 group-hover:border-white`}>
                  <LockOpenIcon />
                </div>
                <div className="flex items-end ml-1">
                  Login
                </div>
              </div>
            </Link>
            : <button className="font-bold" onClick={() => {
              handleLogout()
              setCurrentPage('login')
            }}>
              <div className="flex group">
                <div className="group-hover:border-b-2 group-hover:border-white">
                  <ExitToAppIcon />
                </div>
                <div className="flex items-end ml-1">
                  Logout
                </div>
              </div>
            </button>
          }

          </div>
        </div>
      </section>
    </nav>
  )
}
