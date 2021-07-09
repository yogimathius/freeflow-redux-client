import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const UserConversationListItem = ({ messagerName, messagerId }) => {
  return (
        <div className="transition duration-500 ease-in-out  hover:bg-red-600 transform hover:translate-x-1 hover:scale-100 flex justify-between items-center text-black border-green-500 rounded-xl bg-white border-solid border-1 py-6 px-6 my-2">
            <div className="text-blue-500 font-semibold z-50">
                {messagerName}
            </div>
            <FontAwesomeIcon className="text-blue-500" icon={faChevronRight} />
        </div>
  )
}

export default UserConversationListItem
