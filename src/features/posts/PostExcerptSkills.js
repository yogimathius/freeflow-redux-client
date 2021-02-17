import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSkills, selectSkillsByIds } from '../dbSkills/dbSkillsSlice';

const PostExcerptSkills = ({ postSkillIds }) => {
	const dispatch = useDispatch()

	const postSkillsStatus = useSelector((state) => state.skills.status)


	useEffect(() => {
    if (postSkillsStatus === 'idle') {
      dispatch(fetchSkills())
    }
	}, [postSkillsStatus, dispatch])
	
	const postSkills = useSelector((state) => selectSkillsByIds(state, postSkillIds))
	const renderedPostSkills = postSkills.map((postSkill, index) => {
		return (
			<span key={index} className="italic ">{postSkill}</span>
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