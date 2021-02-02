import React from "react";
import "./ProgressBar.css";

const ProgressBar = (props) => {
  let { experience } = props;

  // const containerStyles = {
  //   height: 20,
  //   width: "100%",
  //   backgroundColor: "#e0e0de",
  //   borderRadius: 50,
  // };

  let level = 1;
  let experiencePoints = 0;
  let width;
  let fullExperience;
  function calculateLevel(points) {
    if (points < 100) {
      fullExperience = 100;
      width = (points);
      return (fullExperience, width, (experiencePoints += points));
    }
    if (points < 260) {
      level = 2;
      fullExperience = 160;
      width = (((points - 100) * 100) / 16)/10;
      experiencePoints += points - 100;
      return (fullExperience, width, level, experiencePoints);
    }
    if (points < 520) {
      level = 3;
      fullExperience = 260;
      width = (((points - 260) * 100) / 26)/10;
      experiencePoints += points - 260;
      return (fullExperience, width, level, experiencePoints);
    }
    if (points < 1000) {
      level = 4;
      fullExperience = 480;
      width = (((points - 520) * 100) / 48)/10;
      experiencePoints += points - 520;
      return (fullExperience, width, level, experiencePoints);
    }
    if (points < 1680) {
      level = 5;
      fullExperience = 680;
      width = (((points - 1000) * 100) / 68)/10;
      experiencePoints += points - 1000;
      return (fullExperience, width, level, experiencePoints);
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
    borderRadius: "inherit",
    textAlign: "right",
  };

  return (
    <div className="progressbars">
      <div className="containerstyles">
        <div style={fillerStyles}className="bgcolor">
          <span
            className="labelstyles"
          >{`${experiencePoints}/${fullExperience}`}</span>
        </div>
      </div>
      <span>Level {level}</span>
    </div>
  );
};

export default ProgressBar;
