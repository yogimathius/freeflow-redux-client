/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import { fetchMessages, selectAllMessages, sortMessages } from '../../reducers/messagesSlice'
// import {}
import useVisualMode from '../../hooks/useVisualMode'

import SelectedUserConversation from './SelectedUserConversation'
import MessagerNameList from './MessagerNameList'
import CreateMessageForm from './CreateMessageForm'
import UsernameSelector from './UsernameSelector'
import { setUserConversations, selectAllConversations, fetchConversations } from '../../reducers/userConversationsSlice'
import { setCurrentThread } from '../../reducers/currentThreadSlice'

const SHOW = 'SHOW'
// const CONFIRM = "CONFIRM";
// const SAVING = "SAVING";
const COMPOSE = 'COMPOSE'
// const ERROR_SAVE = "ERROR_SAVE";
// const ERROR_DELETE = "ERROR_DELETE";

const UserConversationList = () => {
  // const [currentPage, setCurrentThread] = useState('')
  const dispatch = useDispatch()
  const { mode, transition } = useVisualMode(SHOW)
  const { path, url } = useRouteMatch()

  function onComposeMessage () {
    transition(COMPOSE)
  }

  function onSendComposeMessage () {
    transition(SHOW)
  }

  const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : ''

  const handleOnClickLink = (messagerName) => {
    dispatch(setCurrentThread(messagerName))
  }

  const conversations = useSelector((state) => state.userConversations.userConversations)
  const currentThread = useSelector((state) => state.currentThread)
  return (
      <div className="grid grid-cols-4 grid-rows-8 mx-4">
          {/* {mode === SHOW && (

            <div className="row-start-1 flex justify-center my-8 ml-4">
              <button className="btn btn-primary " onClick={onComposeMessage}>
                Compose
              </button>
            </div>
          )} */}
          {/* {mode === COMPOSE && ( */}
            <div className="col-span-4 grid grid-cols-4 items-center my-7">
              {/* <div className="flex justify-center"> */}
              {/* <button onClick={() => transition(SHOW)} className="btn btn-warning col-span-1">Cancel</button> */}
              {/* </div> */}
              <UsernameSelector
                userId={userId}
                messagers={conversations?.messagers}
                currentThread={currentThread}
                setCurrentThread={handleOnClickLink}
                url={url}
                path={path}
              />
            </div>
          {/* )} */}

          <MessagerNameList
            currentThread={currentThread}
            setCurrentThread={handleOnClickLink}
            url={url}
            userConversationNames={conversations?.messagers}
            userId={userId}
          />

          {mode === SHOW && (
            <div className="row-start-3 row-span-7 col-start-2 col-span-3 ">
              <Switch>
                <Route path={`${path}/:messagerId`}>
                  <SelectedUserConversation
                    sortedMessages={conversations?.messages} userId={userId}
                  />
                </Route>
              </Switch>
            </div>
          )}

          {mode === COMPOSE && (
            <CreateMessageForm />
          )}

        </div>
  )
}

export default UserConversationList
