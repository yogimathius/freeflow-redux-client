import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostSkills, selectAllPostSkills } from './postSkillsSlice';

export default function PostSkillsList() {
  const dispatch = useDispatch()
  const postSkills = useSelector(selectAllPostSkills)
  let content

	console.log("this is firing!");
  const postSkillsStatus = useSelector((state) => state.postSkills.status)
  const error = useSelector((state) => state.postSkills.error)

  useEffect(() => {
    if (postSkillsStatus === 'idle') {
      dispatch(fetchPostSkills())
    }
  }, [postSkillsStatus, dispatch])

  if (postSkillsStatus === 'pending') {
    content = <div className="loader">Loading...</div>
  } else if (postSkillsStatus === 'fulfilled') {
    content = postSkills
  } else if (postSkillsStatus === 'rejected') {
    content = <div>{error}</div>
	}
  return <div>{content}</div>
}
