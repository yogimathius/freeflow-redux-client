import React from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import { saveState } from '../../helpers/localStorage';
import { useSelector } from 'react-redux';
import { selectCompletedExperiencesByHelperId } from '../experiences/experiencesSlice';
import { UserNameAndLogo } from './UserNameAndLogo';
import UserInfo from './UserInfo';
import UserSkills from './UserSkills';

export default function UserCard(props) {
  const userExperiences = useSelector((state) => selectCompletedExperiencesByHelperId(state, props.id))

  const experience = (userExperiences.length * 12);
  return (
    <div className='bg-white rounded-xl m-1 hover:shadow-lg space-y-3 p-3 grid grid-cols-1 md:grid-cols-3' key={props.id}>
      {/* <div className=""> */}
        <Link to={`/userprofile/${props.id}`} onClick={() => saveState(props.id)}>
          <UserNameAndLogo userId={props.id} />
        </Link>
        <UserInfo
          profession={props.profession}
          tagline={props.tagline}
          location={props.location}
        />
      {/* </div> */}
      <div className="">
        <UserSkills
          userId={props.id}
        />
      </div>
      <div className='card-footer'>
        <ProgressBar experience={experience} />
      </div>
    </div>
  )
}