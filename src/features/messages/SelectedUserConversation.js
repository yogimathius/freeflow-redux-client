import React from 'react';
import { useParams } from 'react-router-dom';

const SelectedUserConversation = () => {
    let { messagerId } = useParams();


    return (
        <div>
            From router: {messagerId}
        </div>
    );
};

export default SelectedUserConversation;