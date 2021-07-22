import React from 'react'
let level = 1
let experiencePoints = 0
let height
let fullExperience
let colorClass

export function calculateLevel (points) {
  if (points < 100) {
    fullExperience = 100
    height = (points)
    colorClass = 'blue'
    return (fullExperience, height, (experiencePoints += points), colorClass)
  }
  if (points < 260) {
    level = 2
    fullExperience = 160
    height = (((points - 100) * 100) / 16) / 10
    experiencePoints += points - 100
    colorClass = 'green'
    return (fullExperience, height, level, experiencePoints, colorClass)
  }
  if (points < 520) {
    level = 3
    fullExperience = 260
    height = (((points - 260) * 100) / 26) / 10
    experiencePoints += points - 260
    colorClass = 'yellow'
    return (fullExperience, height, level, experiencePoints, colorClass)
  }
  if (points < 1000) {
    level = 4
    fullExperience = 480
    height = (((points - 520) * 100) / 48) / 10
    experiencePoints += points - 520
    colorClass = 'red'
    return (fullExperience, height, level, experiencePoints, colorClass)
  }
  if (points < 1680) {
    level = 5
    fullExperience = 680
    height = (((points - 1000) * 100) / 68) / 10
    experiencePoints += points - 1000
    colorClass = 'purple'
    return (fullExperience, height, level, experiencePoints, colorClass)
  }
  if (points >= 1680) {
    level = 5
    height = 100
    fullExperience = 680
    experiencePoints = 680
    return (fullExperience, height, level, experiencePoints)
  }
}

const ProgressBar = (props) => {
  const { experience } = props

  calculateLevel(Math.floor(experience * 6))

  const fillerStyles = {
    width: '100%',
    height: `${100 - height}%`,
    borderRadius: 'inherit',
    textAlign: 'right'
  }

  return (
    <div className="flex space-x-2">
      <div className={`text-center text-xs md:text-base font-bold text-${colorClass}-500`}>Lv. {level}</div>

      <div className={`bg-${colorClass}-500 flex justify-center rounded w-24`}>
        <div style={fillerStyles} className="bg-gray-300  rounded">
          <div className="flex justify-center">
            <span className={'text-xs text-white mt-2 text-center font-bold px-1'}>{`${experiencePoints}/${fullExperience}`}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
