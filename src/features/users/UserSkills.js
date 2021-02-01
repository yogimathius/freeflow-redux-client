import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserSkillsByPostId } from '../userSkills/userSkillsSlice';

const UserSkills = (props) => {
	const skillsForUser = useSelector(state => selectUserSkillsByPostId(state, props.userId))
	console.log(skillsForUser[0], props.userId);
	const renderedSkills = skillsForUser ? skillsForUser.map((skill, index) => {
		return(
			<span key={index}>{skill.name}</span>
		)
	}) : "";

	return (
		<div>
			<div className="italic">Skills: {renderedSkills}</div>
			
		</div>
	);
};

export default UserSkills;