import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectHelpedExperiencesByUserId } from '../../reducers/experiencesSlice'
import UserExperienceHelpedHistoryItem from './UserExperienceHelpedHistoryItem'

const UserExperienceHelpedHistory = ({ userId }) => {
  const experiences = useSelector((state) => selectHelpedExperiencesByUserId(state, userId))
  const [rewardMessage, setRewardMessage] = useState('')
  let renderedExperiences
  if (experiences) {
    renderedExperiences = experiences.map((experience, index) => {
      return <UserExperienceHelpedHistoryItem
        key={index}
        experience={experience}
        userId={userId}
        setRewardMessage={setRewardMessage}
      />
    })
  }
  return (
    <div className="my-3 pb-2">
      <h3 className="font-bold text-center md:text-xl bg-green-500 rounded my-2 text-white">
        These users want to help you
      </h3>
      {renderedExperiences}
      <div className="flex justify-center text-green-500 font-bold text-2xl my-5">
        {rewardMessage}
      </div>
    </div>
  )
}

export default UserExperienceHelpedHistory
