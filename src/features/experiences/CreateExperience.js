import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { addNewExperience } from '../../reducers/experiencesSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { useLocation } from 'react-router-dom'
import { selectUserById } from '../../reducers/usersSlice'

const CreateExperience = ({ userId }) => {
  const dispatch = useDispatch()
  const { query, search } = useLocation()
  const [error, setError] = useState('')
  let userRoutedFromPosts
  if (query !== undefined) {
    userRoutedFromPosts = query.owner
  }
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const userID = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
  const user = useSelector((state) => selectUserById(state, userID))

  const users = useSelector((state) => state.users.entities)

  const userOptions = []

  if (!users) {
    return null
  }

  for (const userkey in users) {
    if (Object.hasOwnProperty.call(users, userkey)) {
      const user = users[userkey]
      if (user.id === parseInt(userId)) {
        continue
      }
      const fullname = user.first_name + ' ' + user.last_name
      const userObj = { value: user.id, label: fullname }
      userOptions.push(userObj)
    }
  }

  const HandleChange = (user) => {
    localStorage.setItem('selected_user', JSON.stringify(user))
  }

  const canSave =
    userId && addRequestStatus === 'idle'

  const CreateExperience = async () => {
    const selectedUser = JSON.parse(localStorage.getItem('selected_user'))

    if (selectedUser === null) {
      setError('**Please select a user**')
      setTimeout(() => {
        setError('')
      }, 2000)
      return
    }

    if (canSave) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          addNewExperience({
            helper_id: userId,
            helped_id: selectedUser.value,
            creator_id: userId,
            helper: user.name,
            helped: selectedUser.label
          })
        )
        unwrapResult(resultAction)
      } catch (err) {
        console.error('Failed to create new session: ', err)
      } finally {
        setAddRequestStatus('idle')
        localStorage.setItem('selected_user', null)
        setError('')
      }
    }
  }
  const defaultValue = userRoutedFromPosts || 'Select a User'
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 space-x-2 py-4">
      <div className="col-span-6 flex justify-center font-bold text-2xl text-green-500 pb-4">
        Find a User to offer help!
      </div>
      <div className="md:col-start-2 md:col-span-2 ml-2">
        <label
        htmlFor="new session"> </label>
        <Select
          onChange={(e) => HandleChange(e)}
          placeholder="Select a User"
          // value={selectedSkills}
          defaultValue={defaultValue}
          name="users"
          options={userOptions}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>

      <div className="col-start-2 md:col-start-4 md:col-span-2 flex justify-center">
        <button onClick={() => CreateExperience()} className="btn btn-secondary">Create Session</button>
      </div>
      <section className="flex justify-center items-center text-red-500">{error}</section>
    </div>
  )
}

export default CreateExperience
