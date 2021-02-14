import React from 'react';
import CreateExperience from './CreateExperience';
import UserExperienceHistory from './UserExperienceHistory';
import UserExperienceHelpedHistory from './UserExperienceHelpedHistory';


const UserExperiences = ({match}) => {
  const userId = match.params.userId;
  
  return (
    <div className="space-y-2">
      <CreateExperience userId={userId} />
      <UserExperienceHistory 
        userId={userId} 
      />
      <UserExperienceHelpedHistory 
        userId={userId} 
      />
    </div>
  );
};

export default UserExperiences;