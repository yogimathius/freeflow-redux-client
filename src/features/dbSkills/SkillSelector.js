import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSkills, selectAllskills } from './dbSkillsSlice';
// import Autocomplete from "../../helpers/Autocomplete";
import Select from 'react-select';
import {  selectedSkills, setSelectedSkills } from '../dbSkills/selectedSkills/selectedSkillsSlice';

const SkillSelector = ({ initialFormState }) => {
	const dispatch = useDispatch();
	const skills = useSelector(selectAllskills)

	const skillsArr = [];

	for (const skillKey in skills) {
		if (Object.hasOwnProperty.call(skills, skillKey)) {
			const skill = skills[skillKey];
			skillsArr.push(skill);
		}
	}

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
	let skillOptions = []
	// eslint-disable-next-line no-unused-vars
	if (!fetchedSkills) {
		return null;
	}
	
	fetchedSkills.forEach((skill) => {
		let skillObj = { value: skill.name, label: skill.name }
		skillOptions.push(skillObj)
	})

	const HandleChange = (options) => {
		dispatch(setSelectedSkills({options}))
		const selectedSkills = []
		options.forEach(option => {
			// eslint-disable-next-line array-callback-return
			skillsArr.filter(skill => {
				if (skill.name === option.value) {
					selectedSkills.push(skill.id)
				}
			})
		})
		localStorage.setItem('selected_skills', JSON.stringify(selectedSkills))
	}

	// const clearValue = () => {
	// 	setSelectedOptions([])
	// }

	return (
		<div className="md:grid grid-cols-3">
			<label
				className="mr-2 flex justify-center md:justify-end items-center"
				htmlFor="skills"> </label>
			<Select
				onChange={(e) => HandleChange(e)}
				placeholder="Select a Skill"
				value={selectedSkills}
				defaultValue="Select a Skill"
				isMulti
				name="skills"
				options={skillOptions}
				className="basic-multi-select"
				classNamePrefix="select"
			/>
			{/* <button onClick={() => clearValue()}>Clear</button> */}
		</div>
	);
};

export default SkillSelector;