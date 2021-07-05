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
  let receiverId
  if (userMessages[0].sender === messagerId) {
    receiverId = userMessages[0].senderid
  } else if (userMessages[0].receiver === messagerId) {
    receiverId = userMessages[0].receiverid
  }
  return (
        <div className="col-span-2">
            {renderedMessages}
            <MessageTextEditor receiverId={receiverId} />
        </div>
  )
}

export default SelectedUserConversation
