import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Redirect, useHistory } from 'react-router-dom'
import MessagerNameItem from './MessagerNameItem'

const MessageNameList = ({ url, currentThread, setCurrentThread, userConversationNames, userId }) => {
  const renderedMessagers = userConversationNames
    ? userConversationNames.map((messagerObj, index) => {
      const messagerId = messagerObj.userId
      if (messagerId !== userId) {
        const messagerName = messagerObj.name
        return (
          <div key={index} className="">
            <Link onClick={() => setCurrentThread(messagerName)} to={`${url}/${messagerName}`}>
              <MessagerNameItem
                messagerId={messagerId}
                messager={messagerName}
                currentThread={currentThread}
              />

            </Link>
          </div>
        )
      } else {
        return null
      }
    })
    : ''

  return (
    <div className="row-start-2 col-span-1 col-start-1 row-span-6 flex flex-col">
      {renderedMessagers}
    </div>
  )
}

export default MessageNameList
