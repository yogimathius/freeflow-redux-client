import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TimeAgo } from '../posts/TimeAgo'
import { removeExperience } from './experiencesSlice';
import { unwrapResult } from '@reduxjs/toolkit'

const UserExperienceHelpedHistoryItem = ({ experience, userId }) => {
  const dispatch = useDispatch();
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  console.log("this works in item");
  const pending = experience.date_accepted === null ? true : false;
  const accepted = experience.date_accepted !== null  && experience.date_completed === null  ? true : false;
  const completed = experience.date_completed !== null ? true : false;

  const users = useSelector((state) => state.users)

  const helperUserName = users.entities[experience.helper_id];
  console.log(users.entities, experience.helper_id);
  if (!helperUserName) {
    return null;
  }
  console.log("helped: ", helperUserName);
  const canRemove =
  userId && addRequestStatus === 'idle'

  const removeExperienceClicked = async () => {
    console.log("cancel clicked!");

  if (canRemove) {
    try {

      setAddRequestStatus('pending')
      const resultAction = await dispatch(
        removeExperience({ 
          id: experience.id, 
        })
      )
        unwrapResult(resultAction)
      } catch (err) {
        console.error('Failed to create new session: ', err)
      } finally {
        setAddRequestStatus('idle')
        localStorage.setItem('selected_user', null);
        // setError("")
      }
    }
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 mx-2 space-y-1">
      <div>{helperUserName.first_name + " " + helperUserName.last_name}</div>

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
        {pending ? 
        <div className="space-x-2">
          <button className="text-red-500 text-sm btn btn-warning" onClick={() => removeExperienceClicked()}>Decline</button>
          <button className="text-green-500 btn btn-tertiary">Accept</button> 
        </div>
        : 
        accepted ? 
        <div className="space-x-2">
          <button className="text-red-500 text-sm btn btn-warning">Cancel</button> 
          <button className="text-green-500 btn btn-secondary">Complete</button> 
        </div>
        : 
        completed ? <button className="text-green-500 btn btn-secondary">View Details</button> : ""}
      </div>
    </div>
  );
};

export default UserExperienceHelpedHistoryItem;