import React from 'react';
import UserConversationList from './UserConversationList';

const index = () => {
    return (
        <div className="grid grid-cols-3">
            <UserConversationList />
        </div>
    );
};

export default index;