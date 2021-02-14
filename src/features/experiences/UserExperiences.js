import React from 'react';
import CreateExperience from './CreateExperience';
import UserExperienceHistory from './UserExperienceHistory';
import UserExperienceHelpedHistory from './UserExperienceHelpedHistory';


const UserExperiences = ({match}) => {
  const userId = match.params.userId;
  
  return (
    <div className="space-y-2">
      <div className="space-x-2">
        <button className="btn btn-primary">primary</button>
        <button className="btn btn-secondary">secondary</button>
        <button className="btn btn-tertiary">tertiary</button>
        <button className="btn btn-warning">warning</button>

      </div>
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