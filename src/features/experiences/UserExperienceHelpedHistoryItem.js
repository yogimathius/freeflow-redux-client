import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TimeAgo } from '../posts/TimeAgo'
import { acceptExperience, completeExperience, completeOtherExperience, removeExperience } from '../../reducers/experiencesSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import useVisualMode from '../../hooks/useVisualMode'
import { saveState } from '../../helpers/localStorage'
import { Link } from 'react-router-dom'

const SHOW = 'SHOW'
// const CONFIRMCANCEL = "CONFIRMCANCEL";
const CONFIRMDECLINE = 'CONFIRMDECLINE'
const CONFIRMACCEPT = 'CONFIRMACCEPT'
// const CONFIRMCOMPLETE = "CONFIRMCOMPLETE";

const UserExperienceHelpedHistoryItem = ({ experience, userId }) => {
  const dispatch = useDispatch()
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const { mode, transition } = useVisualMode(SHOW)

  // function onConfirmCancel() {
  //   transition(CONFIRMCANCEL)
  // }

  function onConfirmDecline () {
    transition(CONFIRMDECLINE)
  }
  // function onConfirmAccept() {
  //   transition(CONFIRMACCEPT)
  // }
  // function onConfirmComplete() {
  //   transition(CONFIRMCOMPLETE)
  // }

  const pending = experience.date_accepted === null
  const accepted = !!(experience.date_accepted !== null && experience.date_completed === null)
  const completed = experience.date_completed !== null
  const completedByHelped = experience.helped_comments !== null

  const users = useSelector((state) => state.users)

  const helperUserName = users.entities[experience.helper_id]
  if (!helperUserName) {
    return null
  }
  const canRemove =
  userId && addRequestStatus === 'idle'

  const acceptExperienceClicked = async () => {
    if (canRemove) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          acceptExperience({
            id: experience.id
          })
        )
        unwrapResult(resultAction)
      } catch (err) {
        console.error('Failed to accept session: ', err)
      } finally {
        setAddRequestStatus('idle')
        localStorage.setItem('selected_user', null)
        transition(SHOW)
        // setError("")
      }
    }
  }

  const completeExperienceClicked = async () => {
    if (canRemove) {
      try {
        if (experience.submit_completion === false) {
          setAddRequestStatus('pending')
          const resultAction = await dispatch(
            completeExperience({
              id: experience.id,
              ishelper: false,
              comments: '',
              submit_completion: true
            })
          )
          unwrapResult(resultAction)
        } else {
          setAddRequestStatus('pending')
          const resultAction = await dispatch(
            completeOtherExperience({
              id: experience.id,
              ishelper: false,
              comments: ''
            })
          )
          unwrapResult(resultAction)
        }
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
        console.error('Failed to cancel session: ', err)
      } finally {
        setAddRequestStatus('idle')
        localStorage.setItem('selected_user', null)
        // setError("")
      }
    }
  }

  function onCancel () {
    transition(SHOW)
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 md:grid-rows-1 mx-2 space-y-1">
      <Link className="text-blue-500" to={`/userprofile/${helperUserName.id}`} onClick={() => saveState(helperUserName.id)}>

        <div>{helperUserName.first_name + ' ' + helperUserName.last_name}</div>
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

      <div className="md:text-center">

        {/* PENDING */}
        {pending
          ? <div className="space-x-2">
          { mode === SHOW && (
          <div className="space-x-2 text-xs md:text-sm ">
            <button className="text-red-500 btn btn-warning" onClick={() => onConfirmDecline()}>Decline</button>
            <button className="text-green-500 btn btn-tertiary" onClick={() => acceptExperienceClicked()}>Accept</button>
          </div>
          )

          }
          { mode === CONFIRMDECLINE && (
            <div className="flex justify-center">
            <div className="text-center w-min rounded-lg space-y-1">
              <div className="flex justify-center space-x-2">
                <button onClick={() => onCancel()} className="btn btn-warning">Cancel</button>
                <button onClick={() => removeExperienceClicked()} className="btn btn-primary">Confirm</button>
              </div>
            </div>
          </div>
          ) }
          { mode === CONFIRMACCEPT && (
            <div className="flex justify-center">
            <div className="text-center border-2 border-green-500 px-6 py-1 w-min rounded-lg space-y-1">
              <div className="flex justify-center space-x-2">
                <button onClick={() => onCancel()} className="btn btn-warning">Cancel</button>
                <button onClick={() => acceptExperienceClicked()} className="btn btn-primary">Confirm</button>
              </div>
            </div>
          </div>
          ) }
        </div>
          : accepted && completedByHelped !== true

            ? <div className="space-x-2">
          { mode === SHOW && (
          <div className="space-x-2 text-xs md:text-sm ">
            <button className="text-red-500 btn btn-warning" onClick={() => onConfirmDecline()}>Decline</button>
            <button className="text-green-500 btn btn-secondary" onClick={() => completeExperienceClicked()}>Complete</button>
            </div>
          )}
          { mode === CONFIRMACCEPT && (
            <div className="flex justify-center">
            <div className="text-center border-2 border-green-500 px-6 py-1 w-min rounded-lg space-y-1">
              <div className="flex justify-center space-x-2">
                <button onClick={() => onCancel()} className="btn btn-warning">Cancel</button>
                <button onClick={() => acceptExperienceClicked()} className="btn btn-primary">Confirm</button>
              </div>
            </div>
          </div>
          ) }

        </div>
            : completed || completedByHelped ? <button className="text-green-500 btn btn-secondary text-xs md:text-sm ">View Details</button> : ''}
      </div>
    </div>
  )
}

export default UserExperienceHelpedHistoryItem
