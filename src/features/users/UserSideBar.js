import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from '../../reducers/usersSlice'
import { Link, useLocation } from 'react-router-dom'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import { selectCompletedExperiencesByHelperId } from '../../reducers/experiencesSlice'
import { loadState, saveState } from '../../helpers/localStorage'
import UserNameAndLogo from './components/UserNameAndLogo'

const UserSideBar = () => {
  const loggedInUser = loadState()
  if (!loggedInUser) {
    return null
  }
  const loggedInUserID = loggedInUser.id
  const location = useLocation()
  const isHidden = location.pathname.includes('profile') ? 'hidden' : ''
  const user = useSelector((state) => selectUserById(state, loggedInUserID))
  const userExperiences = useSelector((state) => selectCompletedExperiencesByHelperId(state, loggedInUserID))
  const experience = userExperiences.length * 12

  return (
    <div className={`${isHidden} h-content p-4 flex flex-col items-center justify-end 2xl:justify-center 2xl:space-x-2`}>
      <div className=''>
        <Link to={`/userprofile/${user?.id}`} onClick={() => saveState(user?.id)}>
          <UserNameAndLogo isSideBar={true} userId={user?.id} />
        </Link>
      </div>
    </div>
  )
}

export default UserSideBar
