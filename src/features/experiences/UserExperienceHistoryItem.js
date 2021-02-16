import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TimeAgo } from '../posts/TimeAgo'
import { acceptExperience, completeExperience, completeOtherExperience, removeExperience } from './experiencesSlice';

import { unwrapResult } from '@reduxjs/toolkit'

const UserExperienceHistoryItem = ({ experience, userId }) => {
  const dispatch = useDispatch();
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  // const [error, setError] = useState("");

  const pending = experience.date_accepted === null ? true : false;
  const accepted = experience.date_accepted !== null  && experience.date_completed === null  ? true : false;
  const completed = experience.date_completed !== null ? true : false;
  const completedByHelper = experience.helper_comments !== null ? true : false;

  const users = useSelector((state) => state.users)

  const helpedUserName = users.entities[experience.helped_id];

  if (!helpedUserName) {
    return null;
  }
  const canRemove =
  userId && addRequestStatus === 'idle'

  const acceptExperienceClicked = async () => {
    console.log("accept clicked!");

  if (canRemove) {
    try {

      setAddRequestStatus('pending')
      const resultAction = await dispatch(
        acceptExperience({ 
          id: experience.id, 
        })
      )
        unwrapResult(resultAction)
      } catch (err) {
        console.error('Failed to accept session: ', err)
      } finally {
        setAddRequestStatus('idle')
        localStorage.setItem('selected_user', null);
        // setError("")
      }
    }
  }

  const completeExperienceClicked = async () => {
    console.log("accept clicked!");

  if (canRemove) {

    try {
      if (experience.submit_completion === false) {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          completeExperience({ 
            id: experience.id, 
            ishelper: true,
            comments: ""
          })
        )
          unwrapResult(resultAction)          
      } else {
          setAddRequestStatus('pending')
          const resultAction = await dispatch(
            completeOtherExperience({ 
              id: experience.id, 
              ishelper: true,
              comments: ""
            })
          )
            unwrapResult(resultAction)  
      }
      
      } catch (err) {
        console.error('Failed to accept session: ', err)
      } finally {
        setAddRequestStatus('idle')
        localStorage.setItem('selected_user', null);
        // setError("")
      }
    }
  }

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
      <div>{helpedUserName.first_name + " " + helpedUserName.last_name}</div>

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
        {pending ? <button className="text-red-500 text-sm btn btn-warning" onClick={() => removeExperienceClicked()}>Cancel</button>
        : 
        accepted && completedByHelper !== true ? 
        <div className="space-x-2">
        <button className="text-red-500 text-sm btn btn-warning">Cancel</button> 
        <button className="text-green-500 btn btn-secondary" onClick={() => completeExperienceClicked()}>Complete</button> 
      </div>
        : 
        completed || completedByHelper ? <button className="text-green-500 btn btn-secondary">View Details</button> : ""}
      </div>
    </div>
  );
};

export default UserExperienceHistoryItem;