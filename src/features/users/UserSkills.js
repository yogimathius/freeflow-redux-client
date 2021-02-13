import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setVisibilityFilter } from '../filters/filtersSlice';
import { selectUserSkillsByUserId } from '../userSkills/userSkillsSlice';

const UserSkills = (props) => {
	const skillsForUser = useSelector(state => selectUserSkillsByUserId(state, props.userId))
	const dispatch = useDispatch()

	const renderedSkills = skillsForUser ? skillsForUser.map((skill, index) => {

		const setPostFilter = (filter) => {
			dispatch(setVisibilityFilter(filter))
		}
		
		return(
			
			<Link to="/dashboard" onClick={() => setPostFilter(skill.name)} className="italic text-blue-500" key={index}>{skill.name}.</Link>
		)
	}) : "";

	return (
		<div className="space-x-1 flex flex-wrap md:nowrap">
			<div className=" font-bold">My Skills: </div>
			{renderedSkills}
		</div>
	);
};

export default UserSkills;