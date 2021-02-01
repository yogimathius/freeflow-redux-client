import React from 'react';
import { Link } from 'react-router-dom';
import './UserCard.scss';
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import { saveState } from '../../helpers/localStorage';
import { useSelector } from 'react-redux';
import { selectExperiencesByUserId } from '../experiences/experiencesSlice';
import { PostAuthor } from '../posts/PostAuthor';

export default function UserCard(props) {
  const userExperiences = useSelector((state) => selectExperiencesByUserId(state, props.id))

  const experience = (userExperiences.length *29);
  const setCookie = () => {
    saveState(props.id)
  }

  return (
    <div className='border-2 border-solid rounded-xl p-3 border-black space-y-2' key={props.id}>
      <Link to={`/userprofile/${props.id}`} onClick={() => setCookie()}>
        <PostAuthor userId={props.id} />
      </Link>

      <div className='card-footer'>
        <ProgressBar experience={experience} />
      </div>
    </div>
  )
}