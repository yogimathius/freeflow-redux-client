import React from 'react'
import CreateExperience from './CreateExperience'
import UserExperienceHelperHistory from './UserExperienceHelperHistory'
import UserExperienceHelpedHistory from './UserExperienceHelpedHistory'
import { loadState } from '../../helpers/localStorage'

const UserExperiences = ({ match }) => {
  const loggedInUser = loadState()
  const userId = loggedInUser.id

  return (
    <div className="space-y-2 pt-1 mt-16">
      <CreateExperience userId={userId} />
      <UserExperienceHelperHistory
        userId={userId}
      />
      <UserExperienceHelpedHistory
        userId={userId}
      />
    </div>
  )
}

export default UserExperiences
