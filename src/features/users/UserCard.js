import React from 'react';
import { Link } from 'react-router-dom';
import './UserCard.scss';
import RoomIcon from '@material-ui/icons/Room';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import { TimeAgo } from '../posts/TimeAgo';
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import { saveState } from '../../helpers/localStorage';

export default function userCard(props) {
  // console.log("experiences in usercard: ", props.experiences);

  const userExperience = props.experiences.filter(experience => experience.helper_id === props.id)

  const experience = (userExperience.length *29);
  const setCookie = () => {
    saveState(props.id)
  }

  function getRandomInt() {
    return Math.floor(Math.random() * (10000 - 5)) + 4;
  }
  const imgUrl = "http://graph.facebook.com/v2.5/" + getRandomInt() + "/picture";

  return (
    <div className='border-1 border-solid border-black' key={props.id}>
      <Link to={`/userprofile/${props.id}`} onClick={() => setCookie()}>
        <img src={imgUrl} className='avatar' alt='avatar' />
        <h4>{props.firstName} {props.lastName}</h4>
      </Link>

      {props.active ?
      <div className='activity-indicator'> 
        <div className='status'></div> 
        <p>Online</p>
      </div>
      :
      <div></div>
      }

      <div className='description-container'>
        <p>"{props.description}"</p>
      </div>

      <div className='card-footer'>
        <div className="joined">
          <WatchLaterIcon className='clock' />
          <p>joined</p>
          <TimeAgo timestamp={props.created_at} />
        </div>
        <ProgressBar experience={experience} />
        <div className='location'>
          <RoomIcon className='marker' /><p>{props.location}</p>
        </div>
      </div>
    </div>
  )
}