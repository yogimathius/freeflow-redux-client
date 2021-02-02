import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserSkillsByPostId } from '../userSkills/userSkillsSlice';

const UserSkills = (props) => {
	const skillsForUser = useSelector(state => selectUserSkillsByPostId(state, props.userId))

	const renderedSkills = skillsForUser ? skillsForUser.map((skill, index) => {
		return(
			<span key={index}>{skill.name},</span>
		)
	}) : "";

	return (
		<div className="space-x-1 flex">
			<div className="italic">Skills: </div>
			{renderedSkills}
		</div>
	);
};

export default UserSkills;