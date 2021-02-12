import React from 'react';
import UserExperienceHistory from './UserExperienceHistory';

const UserExperiences = ({match}) => {
  const userId = match.params.userId;
  
  return (
    <div>
      <UserExperienceHistory 
        userId={userId} 
      />
    </div>
  );
};

export default UserExperiences;