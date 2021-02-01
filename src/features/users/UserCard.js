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
  const setCookie = () => {
    saveState(props.id)
  }

  return (
    <div className='border-2 border-solid rounded-xl p-3 border-black space-y-2' key={props.id}>
      <Link to={`/userprofile/${props.id}`} onClick={() => setCookie()}>
        <UserNameAndLogo userId={props.id} />
      </Link>

      <div className='card-footer'>
        <ProgressBar experience={experience} />
      </div>
    </div>
  )
}