/* eslint-disable no-tabs */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import SkillSelector from '../dbSkills/SkillSelector'
import { setVisibilityFilter } from '../../reducers/filtersSlice'
import { removeUserSkill, selectUserSkillsByUserId } from '../../reducers/userSkillsSlice'
import useVisualMode from '../../hooks/useVisualMode'
import { setSelectedSkills } from '../../reducers/selectedSkillsSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { loadState } from '../../helpers/localStorage'

const SHOW = 'SHOW'
// const CONFIRM = "CONFIRM";
// const SAVING = "SAVING";
const EDITING = 'EDITING'
// const ERROR_SAVE = "ERROR_SAVE";
// const ERROR_DELETE = "ERROR_DELETE";

const UserSkills = ({ userId, canUpdate }) => {
  const [error, setError] = useState('')

  const loggedInUserID = loadState()

  const skillsForUser = useSelector(state => selectUserSkillsByUserId(state, userId))
  const selectedSkills = useSelector(state => state.selectedSkills)

  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch()

  const { mode, transition } = useVisualMode(SHOW)

  const onEditSkillsClicked = () => {
    transition(EDITING)
  }

  // const canSave = loggedInUserID === userId && addRequestStatus === 'idle'

  const selectedSkillNames = []

  const onSaveClicked = async (e) => {
    e.preventDefault()

    const filtered = []
    const skillsCopy = { ...selectedSkills }
    for (const userSkillKey in skillsForUser) {
      for (const selectedSkill of skillsCopy.options) {
        if (skillsForUser[userSkillKey].name !== selectedSkill.value) {
          filtered.push(skillsForUser[userSkillKey].name)
        }
      }
    }

    // const userSkillsMap = {}
    // const userSkillNames = []
    // for (const userSkill of skillsForUser) {
    //   const skillName = userSkill.name
    //   const skillId = userSkill.id
    //   const skillObj = {
    //     skillName,
    //     skillId
    //   }
    //   userSkillNames.push(skillName)
    //   userSkillsMap[skillName] = {skillObj}
    // }

    // for (const selectedSkill of selectedSkills.options) {
    //   if (!userSkillsMap[selectedSkill.value])
    // }
    // if (!selectedSkillNames.includes(skillName)) {
    //   try {
    //     setAddRequestStatus('pending')
    //     const postResultAction = await dispatch(removeUserSkill({
    //       name: skillName,
    //       userId
    //     })
    //     )
    //     unwrapResult(postResultAction)
    //     // setContent('')
    //     // dispatch(emptySkillsDB())
    //   } catch (err) {
    //     console.error('Failed to remove the user skill: ', err)
    //   } finally {
    //     setAddRequestStatus('idle')
    //     setError('')
    //   }
    // }
    // selectedSkills.map(selectedSkill => {
    //   .map
    //   if (!skillsForUser.includes(selectedSkill)) {
    //     return null
    //   }
    //   return null
    // })
    transition(SHOW)
  }
  const userSkillOptions = []
  const renderedSkills = skillsForUser
    ? skillsForUser.map((skill, index) => {
      const userSkillObj = { value: skill.name, label: skill.name }
      userSkillOptions.push(userSkillObj)
      const setPostFilter = (filter) => {
        dispatch(setVisibilityFilter(filter))
      }

      return (
        <Link to="/dashboard" onClick={() => setPostFilter(skill.name)} className="italic text-blue-500" key={index}>{skill.name}.</Link>
      )
    })
    : ''

  useEffect(() => {
    if (userSkillOptions.length > 0) {
      dispatch(setSelectedSkills({ options: userSkillOptions }))
    }
  }, [])

  return (
    <>
    {mode === SHOW && (
      <div>
        <div className="space-x-1 flex flex-wrap items-center md:nowrap">
          <div className=" font-bold">Skills: </div>
          {renderedSkills}
        </div>
        {loggedInUserID === userId && canUpdate && (
          <button onClick={() => onEditSkillsClicked()} className="font-bold text-green-500 text-xs">Update Skills</button>
        )}
      </div>
    )}

    {mode === EDITING && (
      <div className="flex space-x-4">
        <SkillSelector />
        <div className="flex items-center">
          <button onClick={(e) => onSaveClicked(e)} className="btn btn-primary">Save</button>
        </div>
      </div>
    )}
    </>
  )
}

export default UserSkills
