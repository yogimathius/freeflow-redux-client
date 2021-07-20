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
  // const history = useHistory()
  // const selectedUser = useSelector(state => state.selectedUser.selectedUser)
  // if (selectedUser && selectedUser.value) {
  //   const selectedUserId = selectedUser.value.userId
  //   userMessages = sortedMessages[selectedUserId]
  // } else {
  const userMessages = sortedMessages[messagerId]
  // }

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
        <div className="space-y-8 w-100">
          <ScrollToBottom className="overflow-y-scroll overscroll-contain h-1/2 snap snap-y snap-end snap-mandatory">
              {renderedMessages}
          </ScrollToBottom>
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
