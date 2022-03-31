/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import { saveState } from '../../helpers/localStorage'
import { useSelector } from 'react-redux'
import { selectCompletedExperiencesByHelperId } from '../../reducers/experiencesSlice'
import { UserNameAndLogo } from './UserNameAndLogo'
import UserInfo from './UserInfo'
import UserSkills from './UserSkills'

export default function UserCard ({ user, infoPosition }) {
  const userExperiences = useSelector((state) => selectCompletedExperiencesByHelperId(state, user.id))

  const experience = (userExperiences.length * 12)
  const position = infoPosition === 'right' ? 'text-right' : 'text-left'

  return (
    <div className='flex flex-col justify-start md:justify-between bg-white rounded-xl my-1 hover:shadow-lg space-y-4 p-3 h-full' key={user.id}>
      <div className="flex flex-col mr-4 space-y-2">
        <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0">
          <div className="space-y-6">
            <Link to={`/userprofile/${user.id}`} onClick={() => saveState(user.id)}>
              <UserNameAndLogo userId={user.id} />
            </Link>
            <ProgressBar experience={experience} />
          </div>
          <UserInfo
            profession={user.profession}
            tagline={user.tagline}
            location={user.location}
            position={position}
          />
        </div>
      </div>
      <div className="text-sm">
        <UserSkills
          userId={user.id}
        />
      </div>

    </div>
  )
}
