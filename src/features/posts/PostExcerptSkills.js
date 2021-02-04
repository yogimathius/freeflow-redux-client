import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostSkills, selectAllPostSkills, selectPostSkillsByPostId } from '../postSkills/postSkillsSlice';

const PostExcerptSkills = ({ postId }) => {
	const dispatch = useDispatch()

	console.log("post id in excerpt skill: ", postId);
	const postSkillsStatus = useSelector((state) => state.postSkills.status)


	useEffect(() => {
    if (postSkillsStatus === 'idle') {
      dispatch(fetchPostSkills())
    }
	}, [postSkillsStatus, dispatch])
	
	const postSkillsAll = useSelector((state) => selectAllPostSkills(state))
	// console.log("all post skills: ", postSkillsAll);
	const postSkills = useSelector((state) => selectPostSkillsByPostId(state, postId))
	const renderedPostSkills = postSkills.map((postSkill, index) => {
		return (
			<span className="italic ">{postSkill.name}</span>
		)
	})
	console.log("post skills in excerpt skills: ", postSkills);
	return (
		<div className="text-sm space-x-1">
			<span className="font-bold">Skills:</span> 
			{renderedPostSkills}
		</div>
	);
};

export default PostExcerptSkills;