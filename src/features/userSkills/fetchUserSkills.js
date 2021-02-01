import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserSkills, selectAllUserSkills } from './userSkillsSlice';

export default function UserSkillsList() {
  const dispatch = useDispatch()
  const userSkills = useSelector(selectAllUserSkills)
  let content

  const userSkillsStatus = useSelector((state) => state.userSkills.status)
  const error = useSelector((state) => state.userSkills.error)

  useEffect(() => {
    if (userSkillsStatus === 'idle') {
      dispatch(fetchUserSkills())
    }
  }, [userSkillsStatus, dispatch])

  if (userSkillsStatus === 'pending') {
    content = <div className="loader">Loading...</div>
  } else if (userSkillsStatus === 'fulfilled') {
    content = userSkills
  } else if (userSkillsStatus === 'rejected') {
    content = <div>{error}</div>
  }
  console.log(userSkills);
  return <div>{content}</div>
}
