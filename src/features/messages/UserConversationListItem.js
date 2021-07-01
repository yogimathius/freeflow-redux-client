import React from 'react';
import { Link } from 'react-router-dom';
import { saveState } from '../../helpers/localStorage';


const UserConversationListItem = ({messagerName, messagerId}) => {
    

    return (
        <div className="text-black border-green-500 rounded-xl bg-white border-solid border-1 py-4 px-2 my-2 ">
            <Link to={`/userprofile/${messagerId}`} onClick={() => saveState(messagerId)} className="text-blue-500 font-semibold">
                {messagerName}
            </Link>
        </div>
    );
};

export default UserConversationListItem;