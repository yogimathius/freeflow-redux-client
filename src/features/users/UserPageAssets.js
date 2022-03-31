import React from 'react'
import { useSelector } from 'react-redux'
import { loadState } from '../../helpers/localStorage'
import { selectUserSkillsByUserId } from '../../reducers/userSkillsSlice'
import UserInfo from './UserInfo'
import UserSkills from './UserSkills'

const UserPageAssets = ({ userId, canUpdate, user }) => {
  return (
    <div>
      <UserInfo
        profession={user?.profession}
        tagline={user?.tagline}
        location={user?.location}
      />
      <UserSkills userId={userId} canUpdate={canUpdate} />
    </div>
  )
}

export default UserPageAssets
