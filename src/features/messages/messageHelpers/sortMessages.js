import findMessager from "./findMessager";

export const sortMessages = (messages, userId) => {
    const messageMap = {
      messagers: [],
      messages: {}
    }
    
    let sortedMessageMap;

    for (const messageKey in messages) {
      if (Object.hasOwnProperty.call(messages, messageKey)) {

        const message = messages[messageKey];

        sortedMessageMap = findMessager(message, messageKey, userId)
  
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
      }
    }
    // console.log('with new fn: ', sortedMessageMap);
    const messagers = Object.keys(messageMap.messages)
    messageMap.messagers = messagers;
    console.log(messageMap);
    return messageMap;
}