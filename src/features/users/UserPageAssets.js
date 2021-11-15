import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserSkillsByUserId } from '../../reducers/userSkillsSlice'
import UserSkills from './UserSkills'

const UserPageAssets = ({ userId, canUpdate }) => {
  const loggedInUser = useSelector(state => state.user)
  const skillsForUser = useSelector(state => selectUserSkillsByUserId(state, userId))

  return (
    <div>
      <UserSkills userId={userId} canUpdate={canUpdate} />
    </div>
  )
}

export default UserPageAssets
