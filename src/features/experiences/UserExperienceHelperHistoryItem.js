import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TimeAgo } from '../posts/TimeAgo'
import { completeExperience, completeOtherExperience, removeExperience } from '../../reducers/experiencesSlice'
import { saveState } from '../../helpers/localStorage'
import { unwrapResult } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom'

const UserExperienceHistoryItem = ({ experience, userId }) => {
  const dispatch = useDispatch()
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  // const [error, setError] = useState("");
  const pending = experience.status === 'pending'
  const accepted = experience.status === 'in-progress'
  const completed = experience.status === 'completed'

  const users = useSelector((state) => state.users)

  const helpedUserName = users.entities[experience.helped_id]

  if (!helpedUserName) {
    return null
  }
  const canRemove =
  userId && addRequestStatus === 'idle'

  const completeExperienceClicked = async () => {
    if (canRemove) {
      try {
        // if (experience.submit_completion === false) {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          completeExperience({
            id: experience.id,
            ishelper: true,
            comments: '',
            helped_submit_completion: '',
            helper_submit_completion: true
          })
        )
        unwrapResult(resultAction)
        // } else {
        //   setAddRequestStatus('pending')
        //   const resultAction = await dispatch(
        //     completeOtherExperience({
        //       id: experience.id,
        //       ishelper: true,
        //       comments: ''
        //     })
        //   )
        //   unwrapResult(resultAction)
        // }
      } catch (err) {
        console.error('Failed to accept session: ', err)
      } finally {
        setAddRequestStatus('idle')
        localStorage.setItem('selected_user', null)
        // setError("")
      }
    }
  }

  const removeExperienceClicked = async () => {
    if (canRemove) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          removeExperience({
            id: experience.id
          })
        )
        unwrapResult(resultAction)
      } catch (err) {
        console.error('Failed to create new session: ', err)
      } finally {
        setAddRequestStatus('idle')
        localStorage.setItem('selected_user', null)
        // setError("")
      }
    }
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 md:grid-rows-1 mx-2 space-y-1">
      <Link className="text-blue-500" to={`/userprofile/${helpedUserName.id}`} onClick={() => saveState(helpedUserName.id)}>
        <div>{helpedUserName.first_name + ' ' + helpedUserName.last_name}</div>
      </Link>

      <div className="row-start-2 md:row-start-1 md:text-center">
        <TimeAgo timestamp={experience.date_initiated}/>
      </div>

      <div className="md:text-center">
        {pending
          ? <div className="text-yellow-500">
            Pending
          </div>
          : accepted
            ? <div className="text-blue-500">Incomplete</div>
            : completed ? <div className="text-green-500">Completed</div> : ''}
      </div>

      <div className="md:text-center text-xs md:text-sm ">
          {pending
            ? <div className="space-x-2">
                <button
                  className="text-red-500 btn btn-warning"
                  onClick={() => removeExperienceClicked()}
                >
                  Cancel
                </button>
                <button
                  className="text-blue-500 btn btn-secondary"
                  onClick={() => removeExperienceClicked()}
                >
                  Message
                </button>
              </div>
            : accepted
              ? <div className="space-x-2">
                  <button
                    className="text-red-500 text-sm btn btn-warning">
                      Cancel
                  </button>

                </div>
              : completed
                ? <button
                  className="text-green-500 btn btn-secondary"
                >
                    View Details
                </button>
                : ''}
      </div>
    </div>
  )
}

export default UserExperienceHistoryItem
