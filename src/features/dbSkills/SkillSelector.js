import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSkills, selectAllskills } from './dbSkillsSlice';
// import Autocomplete from "../../helpers/Autocomplete";

const SkillSelector = (props) => {
	const dispatch = useDispatch();

	const skills = useSelector(selectAllskills)

	const skillsArr = [];

	for (const skillKey in skills) {
		if (Object.hasOwnProperty.call(skills, skillKey)) {
			const skill = skills[skillKey];
			skillsArr.push(skill);
		}
	}
	// const skillNames = skills.map(skill => skill.name)

	const skillStatus = useSelector((state) => state.skills.status)

	useEffect(() => {
    if (skillStatus === 'idle') {
      dispatch(fetchSkills())
    }
	}, [skillStatus, dispatch])
	
  let fetchedSkills
  if (skillStatus === 'loading') {
    fetchedSkills = null
  } else if (skillStatus === 'succeeded') {
    fetchedSkills = skills
  } else if (skillStatus === 'failed') {
		console.error(skillStatus)
	}
	const SkillSelector = fetchedSkills ? fetchedSkills.map((skill, index) => {
		return (
  		<option key={index} value={skill.name}>{skill.name}</option>
		)
	}) : "";

	const handleChange = (event) => {
		let value = event.target.value;
		const selectedSkill = skillsArr.find(skill => skill.name === value)
    localStorage.setItem('selected_skill', JSON.stringify(selectedSkill))
	}

	return (
		<div className="text-center">
			{/* <Autocomplete options={skillNames} /> */}
			<label htmlFor="skills">Choose a skill: </label>
			<select id="skills" name="skills" onChange={(e) => handleChange(e)}>
				<option value="Select Skill">Select Skill</option>
				{SkillSelector}
			</select>
		</div>
	);
};

export default SkillSelector;