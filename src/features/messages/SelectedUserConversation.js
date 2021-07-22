/* eslint-disable react/prop-types */
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ScrollToBottom from 'react-scroll-to-bottom'

import MessageTextEditor from './MessageTextEditor'
import UserMessageDetail from './UserMessageDetail'

// eslint-disable-next-line react/prop-types
const SelectedUserConversation = ({ sortedMessages, userId }) => {
  const { messagerId } = useParams()

  const userMessages = sortedMessages[messagerId]
  let receiverId, receiver, sender, renderedMessages

  if (userMessages && !userMessages[0].isNew) {
    renderedMessages = userMessages.length > 0
      ? userMessages.map((message, index) => {
        return (
          <UserMessageDetail key={index} message={message} userId={userId}/>
        )
      })
      : ''

    if (userMessages[0].sender === messagerId) {
      receiver = userMessages[0].sender
      sender = userMessages[0].receiver
      receiverId = userMessages[0].sender_id
    } else if (userMessages[0].receiver === messagerId) {
      receiver = userMessages[0].receiver
      sender = userMessages[0].sender
      receiverId = userMessages[0].receiver_id
    }
  }

  if (userMessages && userMessages[0].isNew) {
    receiverId = userMessages[0].receiverId
    receiver = Object.keys(userMessages)
  }

  return (
        <div className="space-y-8 w-100">
          {renderedMessages !== '' && (
            <ScrollToBottom className="overflow-y-scroll overscroll-contain h-1/2 snap snap-y snap-end snap-mandatory">
                {renderedMessages}
            </ScrollToBottom>
          )}
          {userMessages[0].isNew && (
            <div>Send {messagerId} a message</div>
          )}
          <div className="">
            <MessageTextEditor
              receiverId={receiverId}
              userId={userId}
              receiver={receiver}
              sender={sender}
            />
          </div>
        </div>
  )
}

export default SelectedUserConversation
