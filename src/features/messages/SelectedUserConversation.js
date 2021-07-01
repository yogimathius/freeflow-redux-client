import React from 'react';
import { useParams } from 'react-router-dom';
import UserMessageDetail from './UserMessageDetail';

const SelectedUserConversation = ({sortedMessages, userId}) => {
    let { messagerId } = useParams();
    const userMessages = sortedMessages.messages[messagerId]

    const renderedMessages = userMessages.map((message, index) => {
        return (
            <UserMessageDetail key={index} message={message} userId={userId}/>
        )
    })
    return (
        <div className="col-span-2">
            {renderedMessages}
        </div>
    );
};

export default SelectedUserConversation;