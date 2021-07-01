import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserConversationListItem from './UserConversationListItem';
import { fetchMessages, selectAllMessages, sortMessages } from './messagesSlice';
// import SelectedUserConversation from './SelectedUserConversation';
// import { onMessagerSelected } from './messageHelpers/onMessageSelected';

const UserConversationList = () => {
    const loggedInUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ""
    const userId = loggedInUser.id;
    const userConversations = useSelector(selectAllMessages)
    
    const dispatch = useDispatch()
  
    let messageContent
    // let selectedMessagesContent
    const messagesStatus = useSelector((state) => state.messages.status)
    const messagesError = useSelector((state) => state.messages.error)
    useEffect(() => {
      if (messagesStatus === 'idle') {
        dispatch(fetchMessages(userId))
      }
    }, [messagesStatus, userId, dispatch])
    if (messagesStatus === 'pending') {
      messageContent = <div className="loader">Loading...</div>
    } else if (messagesStatus === 'succeeded') {

    
      const sortedMessages = sortMessages(userConversations.messages, userId)

      console.log('sorted in success: ', sortedMessages);

      let singleUserMessages;

      messageContent = sortedMessages.messagers.map((messagerName, index) => {
        console.log(messagerName);
        const conversation = sortedMessages.messages[messagerName]
        console.log(conversation);
        return (
          <div key={index}>
            <UserConversationListItem  conversation={conversation} messagerName={messagerName}/>

          </div>
        )
      })

      // selectedMessagesContent
    } else if (messagesStatus === 'rejected') {
      messageContent = <div>{messagesError}</div>
    }




    return (
        <div className="mt-10">
            {messageContent}
        </div>
    );
};

export default UserConversationList;