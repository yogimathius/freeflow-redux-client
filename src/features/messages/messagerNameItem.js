import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const UserConversationListItem = ({ messagerName, messagerId, currentPage }) => {
  const activeStyles = messagerName === currentPage ? 'bg-green-500 text-white scale-100' : 'text-green-500'
  return (
        <div className={`${activeStyles} group transition duration-500 ease-in-out  hover:bg-green-500 hover:text-white transform hover:translate-x-1 hover:scale-100 flex justify-between items-center text-black rounded-xl bg-white py-6 px-6 my-2`}>
            <div className={`${activeStyles} group-hover:text-white font-semibold z-50`}>
                {messagerName}
            </div>
            <FontAwesomeIcon className={`${activeStyles} group-hover:text-white`} icon={faChevronRight} />
        </div>
  )
}

export default UserConversationListItem
