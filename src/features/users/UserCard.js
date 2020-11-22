import React from 'react';
import { Link } from 'react-router-dom';
import './UserCard.scss';
import RoomIcon from '@material-ui/icons/Room';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import { TimeAgo } from '../posts/TimeAgo';
import ProgressBar from '../../components/ProgressBar/ProgressBar'

export default function userCard(props) {
  // console.log("karmas in usercard: ", props.karmas);

  const userKarmas = props.karmas.filter(karma => karma.receiver_id === props.id)

  const experience = (userKarmas.length *29);
  return (
    <div className='user-card' key={props.id}>
      <Link to={`/users/${props.id}`}>
        <img src={props.avatar} className='avatar' alt='avatar' />
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