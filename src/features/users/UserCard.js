import React from 'react'
import { Link } from 'react-router-dom'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import { saveState } from '../../helpers/localStorage'
import { useSelector } from 'react-redux'
import { selectCompletedExperiencesByHelperId } from '../experiences/experiencesSlice'
import { UserNameAndLogo } from './UserNameAndLogo'
import UserInfo from './UserInfo'
import UserSkills from './UserSkills'

export default function UserCard (props) {
  const userExperiences = useSelector((state) => selectCompletedExperiencesByHelperId(state, props.id))

  const experience = (userExperiences.length * 12)
  return (
    <div className='bg-white rounded-xl m-1 hover:shadow-lg space-y-4 p-3  ' key={props.id}>
      <div className="flex flex-col mr-4 space-y-2">

      <div className="flex justify-between">
        <div className="space-y-2">
          <Link to={`/userprofile/${props.id}`} onClick={() => saveState(props.id)}>
            <UserNameAndLogo userId={props.id} />
          </Link>
          <div className='mx-4'>
           <ProgressBar experience={experience} />
          </div>
        </div>
        <div className="">
          <UserInfo
            profession={props.profession}
            tagline={props.tagline}
            location={props.location}
          />
        </div>
      </div>

      </div>
      <div className="mx-4 text-sm">
        <UserSkills
          userId={props.id}
        />
      </div>

    </div>
  )
}
