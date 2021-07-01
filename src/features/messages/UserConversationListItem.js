import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom'

import SelectedUserConversation from './SelectedUserConversation';

const UserConversationListItem = ({conversation, messagerName}) => {
    
    let { path, url } = useRouteMatch();

    return (
        <div className="text-black border-green-500 border-solid border-1 py-4 px-2 my-2 cursor-pointer">
                {messagerName}
        </div>
    );
};

export default UserConversationListItem;