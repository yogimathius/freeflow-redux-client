import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSkills, selectSkillsByIds } from '../dbSkills/dbSkillsSlice';
import { setVisibilityFilter } from '../filters/filtersSlice';
import { Link } from 'react-router-dom';

const PostExcerptSkills = ({ postSkillIds }) => {


	const dispatch = useDispatch()


	const setPostFilter = (filter) => {
		dispatch(setVisibilityFilter(filter))
	}

	const postSkillsStatus = useSelector((state) => state.skills.status)


	useEffect(() => {
    if (postSkillsStatus === 'idle') {
      dispatch(fetchSkills())
    }
	}, [postSkillsStatus, dispatch])
	
	const postSkills = useSelector((state) => selectSkillsByIds(state, postSkillIds))
	const renderedPostSkills = postSkills.map((postSkill, index) => {
		return (
			<Link to="/dashboard" onClick={() => setPostFilter(postSkill)} className="italic text-blue-500" key={index}>{postSkill}.</Link>

			// <span key={index} className="italic ">{postSkill}</span>
		)
	})
	return (
		<div className="text-sm space-x-1 flex flex-wrap">
			<span className="font-bold">Skills:</span> 
			{renderedPostSkills}
		</div>
	);
};

export default PostExcerptSkills;