import React from "react";

const ProgressBar = (props) => {
  let { experience } = props;

  let level = 1;
  let experiencePoints = 0;
  let width;
  let fullExperience;
  let colorClass;

  function calculateLevel(points) {
    if (points < 100) {
      fullExperience = 100;
      width = (points);
      colorClass = "blue"
      return (fullExperience, width, (experiencePoints += points), colorClass);
    }
    if (points < 260) {
      level = 2;
      fullExperience = 160;
      width = (((points - 100) * 100) / 16)/10;
      experiencePoints += points - 100;
      colorClass = "green"
      return (fullExperience, width, level, experiencePoints, colorClass);
    }
    if (points < 520) {
      level = 3;
      fullExperience = 260;
      width = (((points - 260) * 100) / 26)/10;
      experiencePoints += points - 260;
      colorClass = "yellow"
      return (fullExperience, width, level, experiencePoints, colorClass);
    }
    if (points < 1000) {
      level = 4;
      fullExperience = 480;
      width = (((points - 520) * 100) / 48)/10;
      experiencePoints += points - 520;
      colorClass = "red"
      return (fullExperience, width, level, experiencePoints, colorClass);
    }
    if (points < 1680) {
      level = 5;
      fullExperience = 680;
      width = (((points - 1000) * 100) / 68)/10;
      experiencePoints += points - 1000;
      colorClass = "purple"
      return (fullExperience, width, level, experiencePoints, colorClass);
    }
    if (points >= 1680) {
      level = 5;
      width = 100;
      fullExperience = 680;
      experiencePoints = 680;
      return (fullExperience, width, level, experiencePoints);
    }
  }

  calculateLevel(Math.floor(experience * 5.75));

  const fillerStyles = {
    height: "100%",
    width: `${width}%`,
    // borderRadius: "inherit",
    textAlign: "right",
  };

  return (
    <div className="grid grid-cols-6 text-xs space-x-1">
      <div className={`text-center font-bold text-${colorClass}-500`}>Lv. {level}</div>

      <div className="bg-gray-300 col-span-5 rounded">
        <div style={fillerStyles}className="bg-gradient-to-r from-green-300 via-green-400 to-green-200 rounded">
          <span
            className="labelstyles font-bold"
          >{`${experiencePoints}/${fullExperience}`}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
