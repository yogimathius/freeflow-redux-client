import React from 'react';
import { Link } from 'react-router-dom';
import './UserCard.scss';
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import { saveState } from '../../helpers/localStorage';
import { useSelector } from 'react-redux';
import { selectAllExperiences } from '../experiences/experiencesSlice';
import { PostAuthor } from '../posts/PostAuthor';
// import { selectUserById } from './usersSlice';

export default function UserCard(props) {
  const experiences = useSelector(selectAllExperiences)
  // const user = useSelector((state) => selectUserById(state, props.id))
  const userExperience = experiences ? experiences.filter(experience => experience.helper_id === props.id) : ""

  const experience = (userExperience.length *29);
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