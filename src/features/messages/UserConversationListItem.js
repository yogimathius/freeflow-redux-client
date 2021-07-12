import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const UserConversationListItem = ({ messagerName, messagerId }) => {
  return (
        <div className="group transition duration-500 ease-in-out  hover:bg-green-500 hover:text-white transform hover:translate-x-1 hover:scale-100 flex justify-between items-center text-black rounded-xl bg-white py-6 px-6 my-2">
            <div className="text-green-500 group-hover:text-white font-semibold z-50">
                {messagerName}
            </div>
            <FontAwesomeIcon className="text-green-500 group-hover:text-white " icon={faChevronRight} />
        </div>
  )
}

export default UserConversationListItem
