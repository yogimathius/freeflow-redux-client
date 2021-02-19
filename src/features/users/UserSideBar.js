import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserById } from './usersSlice'
import { Link } from 'react-router-dom'
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { selectCompletedExperiencesByHelperId } from '../experiences/experiencesSlice';
import { saveState } from '../../helpers/localStorage'

const UserSideBar = () => {
  const userId = useSelector(state => state.user.user.id)
  const user = useSelector((state) => selectUserById(state, userId))
  const userExperiences = useSelector((state) => selectCompletedExperiencesByHelperId(state, userId))

  const experience = userExperiences.length * 12;
  const fullname = user ? user.first_name + " " + user.last_name : ""
  return (
    <div className="border-2 border-green-500 rounded-lg m-2 h-content py-3 px-2 fixed md:mt-24 hidden"> 
      <Link className="" to={`/userprofile/${user?.id}`} onClick={() => saveState(user?.id)}>
        <div className=" font-bold text-center text-blue-500">{fullname}</div>
      </Link>
      <ProgressBar experience={experience} />
    </div>
  );
};

export default UserSideBar;