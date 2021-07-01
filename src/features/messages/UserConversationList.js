import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserConversationListItem from './UserConversationListItem';
import { fetchMessages, selectAllMessages, sortMessages } from './messagesSlice';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import SelectedUserConversation from './SelectedUserConversation';
// import SelectedUserConversation from './SelectedUserConversation';
// import { onMessagerSelected } from './messageHelpers/onMessageSelected';

const UserConversationList = () => {
    const loggedInUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ""
    const userId = loggedInUser.id;
    let { path, url } = useRouteMatch();

    const userConversations = useSelector(selectAllMessages)
    
    const dispatch = useDispatch()
  
    let messageContent

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


      let singleUserMessages;

      messageContent = sortedMessages.messagers.map((messagerName, index) => {
        const conversation = sortedMessages.messages[messagerName]
        console.log('conversation in list: ', conversation);
        return (
          <div key={index}>
            <Link to={`${url}/${messagerName}`}>
              <UserConversationListItem  conversation={conversation} messagerName={messagerName}/>
            </Link>

          </div>
        )
      })

      // selectedMessagesContent
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
                <SelectedUserConversation />
              </Route>
            </Switch>

        </div>
    );
};

export default UserConversationList;