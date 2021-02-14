import React from 'react';
import { useSelector } from 'react-redux';
import { selectHelpedExperiencesByUserId } from './experiencesSlice';
import UserExperienceHelpedHistoryItem from './UserExperienceHelpedHistoryItem';

const UserExperienceHelpedHistory = ({userId}) => {
  const experiences = useSelector((state) => selectHelpedExperiencesByUserId(state, userId))


  let renderedExperiences;
  if (experiences) {
    renderedExperiences = experiences.map((experience, index) => {
      return <UserExperienceHelpedHistoryItem 
        key={index}
        experience={experience}
        userId={userId}
      />
    })
  }
  return (
    <div className="my-3 pb-2">
      <h3 className="font-bold text-center md:text-xl bg-green-500 rounded my-2 text-white">These users want to help you</h3>
      {renderedExperiences}
    </div>
  );
};

export default UserExperienceHelpedHistory;