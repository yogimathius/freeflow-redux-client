/* eslint-disable react/prop-types */
import React from 'react'
import { useParams } from 'react-router-dom'
import MessageTextEditor from './MessageTextEditor'
import UserMessageDetail from './UserMessageDetail'

// eslint-disable-next-line react/prop-types
const SelectedUserConversation = ({ sortedMessages, userId }) => {
  const { messagerId } = useParams()
  const userMessages = sortedMessages.messages[messagerId]

  const renderedMessages = userMessages.map((message, index) => {
    return (
            <UserMessageDetail key={index} message={message} userId={userId}/>
    )
  })
  return (
        <div className="col-span-2">
            {renderedMessages}
            <MessageTextEditor messagerId={messagerId} />
        </div>
  )
}

export default SelectedUserConversation
