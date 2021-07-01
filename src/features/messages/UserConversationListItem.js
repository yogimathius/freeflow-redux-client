import React from 'react';
import SelectedUserConversation from './SelectedUserConversation';

const UserConversationListItem = ({conversation, messagerName}) => {
    
    

    return (
        <div className="text-black border-green-500 border-solid border-1 py-4 px-2 my-2 cursor-pointer">
            {messagerName}
            <SelectedUserConversation

            />
        </div>
    );
};

export default UserConversationListItem;