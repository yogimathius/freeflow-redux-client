/* eslint-disable no-tabs */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSkills, selectAllskills } from '../../reducers/dbSkillsSlice'
// import Autocomplete from "../../helpers/Autocomplete";
import Select from 'react-select'
import { setSelectedSkills } from '../../reducers/selectedSkillsSlice'

const SkillSelector = () => {
  const dispatch = useDispatch()
  const skills = useSelector(selectAllskills)
  const selectedSkills = useSelector(state => state.selectedSkills)
  const skillsArr = []

  for (const skillKey in skills) {
    if (Object.hasOwnProperty.call(skills, skillKey)) {
      const skill = skills[skillKey]
      skillsArr.push(skill)
    }
  }

  const skillStatus = useSelector((state) => state.skills.status)

  let fetchedSkills
  if (skillStatus === 'loading') {
    fetchedSkills = null
  } else if (skillStatus === 'succeeded') {
    fetchedSkills = skills
  } else if (skillStatus === 'failed') {
    console.error(skillStatus)
  }
  const skillOptions = []
  // eslint-disable-next-line no-unused-vars
  if (!fetchedSkills) {
    return null
  }

  fetchedSkills.forEach((skill) => {
    const skillObj = { value: skill.id, label: skill.name }
    skillOptions.push(skillObj)
  })

  const HandleChange = (options) => {
    dispatch(setSelectedSkills(options))
    const selectedSkillsStorage = []
    options.forEach(option => {
      selectedSkillsStorage.push(option.value)
    })
  }

  return (
	<div className="w-full">
		<label
			htmlFor="skills"> </label>
		<Select
			onChange={(e) => HandleChange(e)}
			placeholder="Select a Skill"
			value={selectedSkills || null}
			defaultValue="Select a Skill"
			isMulti
			name="skills"
			options={skillOptions}
			className="basic-multi-select"
			classNamePrefix="select"
		/>
	</div>
  )
}

export default SkillSelector
