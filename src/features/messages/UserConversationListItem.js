import React from 'react';

const UserConversationListItem = ({messagerName, messagerId}) => {


    return (
        <div className="text-black border-green-500 rounded-xl bg-white border-solid border-1 py-4 px-2 my-2">
            <div className="text-blue-500 font-semibold z-50">
                {messagerName}
            </div>
        </div>
    );
};

export default UserConversationListItem;