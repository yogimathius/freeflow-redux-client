import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSkills, selectAllskills } from './dbSkillsSlice';

const SkillSelector = () => {
	const dispatch = useDispatch();

	const skills = useSelector(selectAllskills)

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
    this.setState({
        disabled: value === '2'
    });
	}
	return (
		<div>
			<label htmlFor="skills">Choose a skill:</label>
			<select id="skills" name="skills" onChange={(e) => handleChange(e)}>
				{SkillSelector}
			</select>
		</div>
	);
};

export default SkillSelector;