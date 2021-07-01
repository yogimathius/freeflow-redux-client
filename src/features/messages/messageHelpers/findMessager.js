import React from 'react';

const findMessager = (message, messageMap, userId) => {
    const senderid = message.senderid;
    const receiverid = message.receiverid;

    if (senderid !== userId && !messageMap.messages[senderid]) {
        const senderName = message.sender;

        messageMap.messagers.push(senderName)
        messageMap.messages[senderid] = [message]
      } 

      if (senderid !== userId && messageMap.messages[senderid]) {
        messageMap.messages[senderid].push(message)
      }

      if (receiverid !== userId && !messageMap.messages[receiverid]) {
        const receiverName = message.receiver;

        messageMap.messagers.push({receiverName})
        messageMap.messages[receiverid] = [message]     
      }

      if (receiverid !== userId && messageMap.messages[receiverid]) {
        messageMap.messages[receiverid].push(message)
      } 
    return messageMap;
};

export default findMessager;