import React from 'react';
import { useSelector } from 'react-redux';
import { selectExperiencesByUserId } from '../experiences/experiencesSlice';

const UserExperiences = ({userId}) => {
  const userExperiences = useSelector((state) => selectExperiencesByUserId(state, userId))
  console.log(userExperiences);
  return (
    <div>
      
    </div>
  );
};

export default UserExperiences;