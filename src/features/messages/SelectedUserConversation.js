/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react'
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

  const messageEl = useRef(null)

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', event => {
        const { innerHeight: height } = window

        const { currentTarget: target } = event
        console.log(parseInt(target.scrollHeight) + 50)
        target.scroll({ top: height, behavior: 'smooth' })
      })
    }
  }, [])

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
          <div className="overflow-y-scroll overscroll-contain h-1/2 snap snap-y snap-end snap-mandatory" ref={messageEl}>
            {renderedMessages}
          </div>
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
