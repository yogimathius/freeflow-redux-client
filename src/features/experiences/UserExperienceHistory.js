import React from 'react';
import { useSelector } from 'react-redux';
import { selectHelperExperiencesByUserId } from './experiencesSlice';
import UserExperienceHistoryItem from './UserExperienceHistoryItem';

const UserExperienceHistory = ({userId}) => {
  const experiences = useSelector((state) => selectHelperExperiencesByUserId(state, userId))

  let renderedExperiences;
  if (experiences) {
    renderedExperiences = experiences.map((experience, index) => {
      return <UserExperienceHistoryItem 
        key={index}
        experience={experience}
      />
    })
  }
  return (
    <div className="my-3 pb-2">
      <h3 className="font-bold text-center md:text-xl bg-green-500 rounded my-2 text-white">Help Others</h3>
      {renderedExperiences}
    </div>
  );
};

export default UserExperienceHistory;