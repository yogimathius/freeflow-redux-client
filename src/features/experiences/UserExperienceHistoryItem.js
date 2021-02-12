import React from 'react';
import { TimeAgo } from '../posts/TimeAgo'

const UserExperienceHistoryItem = ({experience}) => {
  const pending = experience.date_accepted === null ? true : false;
  const accepted = experience.date_accepted !== null  && experience.date_completed === null  ? true : false;
  const completed = experience.date_completed !== null ? true : false;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 mx-2">
      <div>{experience.helped}</div>

      <div className="md:text-center">
        <TimeAgo timestamp={experience.date_initiated}/>
      </div>

      <div className="md:text-center">
        {pending ? 
          <div className="text-yellow-500">
            Pending
          </div>
        : 
        accepted ? <div className="text-blue-500">Incomplete</div> : 
        completed ? <div className="text-green-500">Completed</div> : ""}
      </div>

      <div className="md:text-center">
        {pending ? <button className="text-red-500 text-sm">Cancel</button>
        : 
        accepted ? <button className="text-blue-500">Cancel</button> : 
        completed ? <button className="text-green-500">View</button> : ""}
      </div>
    </div>
  );
};

export default UserExperienceHistoryItem;