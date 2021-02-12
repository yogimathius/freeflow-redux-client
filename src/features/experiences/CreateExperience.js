import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

const CreateExperience = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(state => state.user.user)

  const users = useSelector((state) => state.users.entities)
  console.log(users);

  let userOptions = [];

  if(!users) {
    return null;
  }

  for (const userkey in users) {
    if (Object.hasOwnProperty.call(users, userkey)) {
      const user = users[userkey];
      if (user.id === parseInt(loggedInUser.id)) {
        continue
      }
      let fullname = user.first_name + " " + user.last_name
      let userObj = { value: user.id, label: fullname}
      userOptions.push(userObj)
    }
  }

  const HandleChange = (user) => {
    console.log(user);
		const selectedSkills = []
		localStorage.setItem('selected_user', JSON.stringify(selectedSkills))
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
        <button className="btn btn-secondary">Create Session</button>
      </div>
    </div>
  );
};

export default CreateExperience;