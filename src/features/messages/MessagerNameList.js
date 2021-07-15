import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MessagerNameItem from './MessagerNameItem'

const MessageNameList = ({ url, currentPage, setCurrentPage, userConversationNames }) => {
  // const userConversationNames = useSelector(state => state.userConversations)

  const renderedMessagers = userConversationNames
    ? userConversationNames.map((messagerObj, index) => {
      const messagerId = messagerObj.userId
      const messagerName = messagerObj.name
      return (
          <div key={index} className="">
            <Link onClick={() => setCurrentPage(messagerName)} to={`${url}/${messagerName}`}>
              <MessagerNameItem
                messagerId={messagerId}
                messager={messagerName}
                currentPage={currentPage}
                />

            </Link>
          </div>
      )
    })
    : ''

  console.log(userConversationNames)
  return (
    <div className="row-start-2 col-span-1 col-start-1 row-span-6 flex flex-col">
    {renderedMessagers}
        </div>
  )
}

export default MessageNameList
