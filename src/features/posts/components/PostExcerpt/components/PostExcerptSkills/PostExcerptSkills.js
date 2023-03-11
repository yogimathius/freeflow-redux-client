/* eslint-disable no-tabs */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSkills, selectSkillsByIds } from '../../../../../../reducers/dbSkillsSlice'
import { setVisibilityFilter } from '../../../../../../reducers/filtersSlice'
import { Link } from 'react-router-dom'

const PostExcerptSkills = ({ postSkillIds }) => {
  const dispatch = useDispatch()

  const setPostFilter = (filter) => {
    dispatch(setVisibilityFilter(filter))
  }

  const postSkills = useSelector((state) => selectSkillsByIds(state, postSkillIds))
  const renderedPostSkills = postSkills.map((postSkill, index) => {
    return (
			<Link to="/dashboard" onClick={() => setPostFilter(postSkill)} className="italic text-blue-500" key={index}>{postSkill}.</Link>

    // <span key={index} className="italic ">{postSkill}</span>
    )
  })
  return (
		<div data-testid="skillLinks" className="text-sm space-x-1 flex flex-wrap">
			<span className="font-bold">Skills:</span>
			{renderedPostSkills}
		</div>
  )
}

export default PostExcerptSkills
