import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserConversationListItem from './messagerNameItem'
import { fetchMessages, selectAllMessages, sortMessages } from './messagesSlice'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'
import SelectedUserConversation from './SelectedUserConversation'

const UserConversationList = () => {
  const [currentPage, setCurrentPage] = useState('')

  const loggedInUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
  const userId = loggedInUser.id
  const { path, url } = useRouteMatch()

  const userConversations = useSelector(selectAllMessages)

  const dispatch = useDispatch()

  let renderedMessagers
  let sortedMessages
  const messagesStatus = useSelector((state) => state.messages.status)
  const messagesError = useSelector((state) => state.messages.error)
  useEffect(() => {
    if (messagesStatus === 'idle') {
      dispatch(fetchMessages(userId))
    }
  }, [messagesStatus, userId, dispatch])
  if (messagesStatus === 'pending') {
    renderedMessagers = <div className="loader">Loading...</div>
  } else if (messagesStatus === 'succeeded') {
    sortedMessages = sortMessages(userConversations.entities, userId)
    renderedMessagers = sortedMessages.messagers.map((messagerName, index) => {
      const messagerId =
          sortedMessages.messages[messagerName].receiver === messagerName
            ? sortedMessages.messages[messagerName][0].sender_id
            : sortedMessages.messages[messagerName][0].receiver_id
      return (
          <div key={index} className="">
            <Link onClick={() => setCurrentPage(messagerName)} to={`${url}/${messagerName}`}>
              <UserConversationListItem
                messagerId={messagerId}
                messagerName={messagerName}
                currentPage={currentPage}
                />

            </Link>

          </div>
      )
    })
  } else if (messagesStatus === 'failed') {
    renderedMessagers = <div>{messagesError}</div>
  }

  return (
      <div className="grid grid-cols-4 grid-rows-8 mx-4">
          <div className="row-start-1 col-span-3 mb-8 mr-4">
            <button className="btn btn-primary ">
              Compose Message
            </button>
          </div>
          <div className="row-start-2 col-span-1 col-start-1 row-span-6 flex flex-col">
            {renderedMessagers}
          </div>
          <div className="row-start-3 row-span-7 col-start-2 col-span-3 ">
            <Switch>
              <Route path={`${path}/:messagerId`}>
                <SelectedUserConversation
                  sortedMessages={sortedMessages} userId={userId}
                />
              </Route>
            </Switch>
          </div>

        </div>
  )
}

export default UserConversationList
