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
  let receiverId, receiver, sender
  if (userMessages[0].sender === messagerId) {
    receiver = userMessages[0].sender
    sender = userMessages[0].receiver
    receiverId = userMessages[0].sender_id
  } else if (userMessages[0].receiver === messagerId) {
    receiver = userMessages[0].receiver
    sender = userMessages[0].sender
    receiverId = userMessages[0].receiver_id
  }
  return (
        <div className="col-span-2">
            {renderedMessages}
            <MessageTextEditor
              receiverId={receiverId}
              userId={userId}
              receiver={receiver}
              sender={sender}
            />
        </div>
  )
}

export default SelectedUserConversation
