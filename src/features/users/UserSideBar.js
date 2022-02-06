import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from '../../reducers/usersSlice'
import { Link } from 'react-router-dom'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import { selectCompletedExperiencesByHelperId } from '../../reducers/experiencesSlice'
import { loadState, saveState } from '../../helpers/localStorage'
import { UserNameAndLogo } from './UserNameAndLogo'
import UserInfo from './UserInfo'
import UserSkills from './UserSkills'

const UserSideBar = () => {
  const loggedInUser = loadState()
  const loggedInUserID = loggedInUser.id
  const user = useSelector((state) => selectUserById(state, loggedInUserID))
  const userExperiences = useSelector((state) => selectCompletedExperiencesByHelperId(state, loggedInUserID))
  const experience = userExperiences.length * 12

  return (
    <div className="border-b-3 border-green-500 m-2 h-content py-3 px-4 fixed md:mt-24  space-y-2">
      <Link to={`/userprofile/${user?.id}`} onClick={() => saveState(user?.id)}>
        <UserNameAndLogo userId={user?.id} />
      </Link>
      <div className="flex justify-center">
        <ProgressBar experience={experience} />
      </div>
      <div>
      <UserInfo
            profession={user?.profession}
            tagline={user?.tagline}
            location={user?.location}
          />
      </div>
      <div className="text-sm">
        <UserSkills
          userId={user?.id}
        />
      </div>
    </div>
  )
}

export default UserSideBar
