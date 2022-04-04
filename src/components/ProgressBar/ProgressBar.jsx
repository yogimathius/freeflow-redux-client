import React from 'react'
const ProgressBar = (props) => {
  const { experience } = props

  let level = 1
  let experiencePoints = 0
  let height
  let fullExperience
  let colorClass
  let bgColorClass

  function calculateLevel (points) {
    if (points < 100) {
      fullExperience = 100
      height = (points)
      colorClass = 'blue'
      bgColorClass = 'blue'
      return (fullExperience, height, (experiencePoints += points), colorClass, bgColorClass)
    }
    if (points < 260) {
      level = 2
      fullExperience = 160
      height = (((points - 100) * 100) / 16) / 10
      experiencePoints += points - 100
      colorClass = 'green'
      bgColorClass = 'green'

      return (fullExperience, height, level, experiencePoints, colorClass, bgColorClass)
    }
    if (points < 520) {
      level = 3
      fullExperience = 260
      height = (((points - 260) * 100) / 26) / 10
      experiencePoints += points - 260
      colorClass = 'yellow'
      bgColorClass = 'yellow'

      return (fullExperience, height, level, experiencePoints, colorClass, bgColorClass)
    }
    if (points < 1000) {
      level = 4
      fullExperience = 480
      height = (((points - 520) * 100) / 48) / 10
      experiencePoints += points - 520
      colorClass = 'red'
      bgColorClass = 'red'

      return (fullExperience, height, level, experiencePoints, colorClass, bgColorClass)
    }
    if (points < 1680) {
      level = 5
      fullExperience = 680
      height = (((points - 1000) * 100) / 68) / 10
      experiencePoints += points - 1000
      colorClass = 'purple'
      bgColorClass = 'purple'

      return (fullExperience, height, level, experiencePoints, colorClass, bgColorClass)
    }
    if (points >= 1680) {
      level = 5
      height = 100
      fullExperience = 680
      experiencePoints = 680
      return (fullExperience, height, level, experiencePoints)
    }
  }

  calculateLevel(Math.floor(experience * 5.75))

  const fillerStyles = {
    width: '100%',
    height: `${100 - height}%`,
    borderRadius: 'inherit',
    textAlign: 'right'
  }

  return (
    <div className='flex items-end space-x-1'>
      <div className="flex flex-col items-start space-y-1 -mb-0.5">
        <div className={`text-center text-xs font-bold text-${colorClass}-500`}>Lv. {level}</div>
        <span className={`text-${colorClass}-500 text-xs mt-2 text -center font-bold`}>{`${experiencePoints}/${fullExperience}`}</span>
      </div>

      <div className={`${bgColorClass}-500 flex justify-center w-6 h-10`}>
        <div style={fillerStyles} className="bg-gray-300">
        </div>
      </div>
    </div>

  )
}

export default ProgressBar
