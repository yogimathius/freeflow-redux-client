import React from 'react';
import {  useRouteMatch } from 'react-router-dom'


const UserConversationListItem = ({messagerName}) => {
    

    return (
        <div className="text-black border-green-500 border-solid border-1 py-4 px-2 my-2 cursor-pointer">
            {messagerName}
        </div>
    );
};

export default UserConversationListItem;