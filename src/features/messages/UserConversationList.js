import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserConversationListItem from './UserConversationListItem';
import { fetchMessages, selectAllMessages, sortMessages } from './messagesSlice';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import SelectedUserConversation from './SelectedUserConversation';

const UserConversationList = () => {
    const loggedInUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ""
    const userId = loggedInUser.id;
    let { path, url } = useRouteMatch();

    const userConversations = useSelector(selectAllMessages)
    
    const dispatch = useDispatch()
  
    let messageContent
    let sortedMessages
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

    
      sortedMessages = sortMessages(userConversations.messages, userId)

      messageContent = sortedMessages.messagers.map((messagerName, index) => {
        const messagerId = 
          sortedMessages.messages[messagerName].receiver === messagerName 
            ? sortedMessages.messages[messagerName][0].senderid 
            : sortedMessages.messages[messagerName][0].receiverid
        console.log(sortedMessages.messages[messagerName][0].receiver, messagerName);
        console.log(messagerId);
        return (
          <div key={index}>
            <Link to={`${url}/${messagerName}`}>
              <UserConversationListItem
                messagerId={messagerId} 
                messagerName={messagerName}/>
            </Link>

          </div>
        )
      })

    } else if (messagesStatus === 'rejected') {
      messageContent = <div>{messagesError}</div>
    }




    return (
        <div className="mt-10 grid grid-cols-3">
          <div>
            {messageContent}  
          </div>
            <Switch>
              <Route path={`${path}/:messagerId`}>
                <SelectedUserConversation
                  sortedMessages={sortedMessages} userId={userId}
                />
              </Route>
            </Switch>

        </div>
    );
};

export default UserConversationList;