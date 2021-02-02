import React from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import { saveState } from '../../helpers/localStorage';
import { useSelector } from 'react-redux';
import { selectExperiencesByUserId } from '../experiences/experiencesSlice';
import { UserNameAndLogo } from '../posts/UserNameAndLogo';

export default function UserCard(props) {
  const userExperiences = useSelector((state) => selectExperiencesByUserId(state, props.id))

  const experience = (userExperiences.length *29);

  return (
    <div className='bg-white rounded-xl m-1 hover:shadow-lg  space-y-3 p-3' key={props.id}>
      <Link to={`/userprofile/${props.id}`} onClick={() => saveState()}>
        <UserNameAndLogo userId={props.id} />
      </Link>

      <div className='card-footer'>
        <ProgressBar experience={experience} />
      </div>
    </div>
  )
}