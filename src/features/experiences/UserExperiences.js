import React from 'react';
import CreateExperience from './CreateExperience';
import UserExperienceHistory from './UserExperienceHistory';

const UserExperiences = ({match}) => {
  const userId = match.params.userId;
  
  return (
    <div>
      <CreateExperience userId={userId} />
      <UserExperienceHistory 
        userId={userId} 
      />
    </div>
  );
};

export default UserExperiences;