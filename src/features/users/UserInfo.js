import React from 'react';

const UserInfo = ({ profession, tagline }) => {
  return (
    <div className="space-y-3">
      <div className="ml-1 md:text-lg font-bold">{profession}</div>
      <div className="text-sm md:text-base italic">"{tagline}"</div>      
    </div> 
  );
};

export default UserInfo;