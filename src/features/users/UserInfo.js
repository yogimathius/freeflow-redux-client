import React from 'react';

const UserInfo = ({ profession, tagline, location }) => {
  return (
    <div className="space-y-3 text-right">
      <div className="ml-1 md:text-lg font-bold">{profession}</div>
      <div className="text-sm md:text-base italic">"{tagline}"</div>  
      <div className="font-semibold text-green-500">{location}</div>    
    </div> 
  );
};

export default UserInfo;