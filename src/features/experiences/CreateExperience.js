import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { addNewExperience } from './experiencesSlice';
import { unwrapResult } from '@reduxjs/toolkit'

const CreateExperience = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const [addRequestStatus, setAddRequestStatus] = useState('idle')


  const user = useSelector(state => state.user.user)

  const userId = user.id
  const users = useSelector((state) => state.users.entities)

  let userOptions = [];

  if(!users) {
    return null;
  }

  for (const userkey in users) {
    if (Object.hasOwnProperty.call(users, userkey)) {
      const user = users[userkey];
      if (user.id === parseInt(userId)) {
        continue
      }
      let fullname = user.first_name + " " + user.last_name
      let userObj = { value: user.id, label: fullname}
      userOptions.push(userObj)
    }
  }

  const HandleChange = (user) => {
		localStorage.setItem('selected_user', JSON.stringify(user))
	}

  const canSave =
    userId && addRequestStatus === 'idle'

  const CreateExperience = async () => {
    const selectedUser = JSON.parse(localStorage.getItem('selected_user'));

  if (selectedUser === null) {
    setError("**Please select a user**");
    setTimeout(() => {
      setError('');
    }, 2000);
    return
  }

  if (canSave) {
    console.log("ids: ", selectedUser.value, userId);
    try {
      console.log('this is working');
      console.log("can save before pending: ", canSave);

      setAddRequestStatus('pending')
      const resultAction = await dispatch(
        addNewExperience({ 
          helper_id: userId, 
          helped_id: selectedUser.value,
          creator_id: userId,
          helper: user.name,
          helped: selectedUser.label
        })
      )
        unwrapResult(resultAction)
      } catch (err) {
        console.error('Failed to create new session: ', err)
      } finally {
        setAddRequestStatus('idle')
        localStorage.setItem('selected_user', null);
        setError("")
      }
    }
  }


  return (
    <div className="grid grid-cols-4 space-x-2 pt-2">
        <label
				className="mr-2 flex justify-center md:justify-end items-center"
				htmlFor="new session"> </label>
			<Select
				onChange={(e) => HandleChange(e)}
				placeholder="Select a User"
				// value={selectedSkills}
				defaultValue="Select a User"
				name="users"
				options={userOptions}
				className="basic-multi-select"
				classNamePrefix="select"
			/>

      <div className="flex justify-center">
        <button onClick={() => CreateExperience()} className="btn btn-secondary">Create Session</button>
      </div>
      <section className="flex justify-center items-center text-red-500">{error}</section>
    </div>
  );
};

export default CreateExperience;