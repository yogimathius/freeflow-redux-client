import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostSkills, selectPostSkillsByPostId } from '../postSkills/postSkillsSlice';

const PostExcerptSkills = ({ postId }) => {
	const dispatch = useDispatch()

	const postSkillsStatus = useSelector((state) => state.postSkills.status)


	useEffect(() => {
    if (postSkillsStatus === 'idle') {
      dispatch(fetchPostSkills())
    }
	}, [postSkillsStatus, dispatch])
	
	const postSkills = useSelector((state) => selectPostSkillsByPostId(state, postId))
	const renderedPostSkills = postSkills.map((postSkill, index) => {
		return (
			<span key={index} className="italic ">{postSkill.name}</span>
		)
	})
	return (
		<div className="text-sm space-x-1">
			<span className="font-bold">Skills:</span> 
			{renderedPostSkills}
		</div>
	);
};

export default PostExcerptSkills;