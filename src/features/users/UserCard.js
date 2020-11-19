import React from 'react';
import { Link } from 'react-router-dom';
import './UserCard.scss';
import RoomIcon from '@material-ui/icons/Room';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import { TimeAgo } from '../posts/TimeAgo';

function userCard(props) {
  return (
    <div className='user-card' key={props.id}>
      <Link to={`/users/${props.id}`}>
        <img src={props.avatar} className='avatar' alt='avatar' />
        <h4>{props.firstName} {props.lastName}</h4>
      </Link>

      {props.active ?
      <div class='activity-indicator'> 
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
        <p className="joined">
          <WatchLaterIcon className='clock' />
          <p>joined</p>
          <TimeAgo timestamp={props.created_at} />
        </p>

        <div class='location'>
          <RoomIcon className='marker' /><p>{props.location}</p>
        </div>
      </div>
    </div>
  )
}

export default userCard
