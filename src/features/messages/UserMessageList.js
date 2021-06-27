import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import sortMessages from '../../helpers/sortMessages'
import { fetchMessages, selectMessagesByUserId, sortMessages } from './messagesSlice'
// import MessageListItem from './MessageListItem'

export const UserMessagesList = () => {
  const loggedInUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ""
  const userId = loggedInUser.id;
  const messages = useSelector((state) => selectMessagesByUserId(state, parseInt(userId)))
  const dispatch = useDispatch()

  let content

  const messagesStatus = useSelector((state) => state.messages.status)
  const error = useSelector((state) => state.messages.error)

  useEffect(() => {
    if (messagesStatus === 'idle') {
      dispatch(fetchMessages())
    }
  }, [messagesStatus, dispatch])

  if (messagesStatus === 'pending') {
    content = <div className="loader">Loading...</div>
  } else if (messagesStatus === 'fulfilled') {

  } else if (messagesStatus === 'rejected') {
    content = <div>{error}</div>
  }
    
  // console.log('message list: ', messages);
  const sortedMessages = sortMessages(messages, userId)

  console.log(sortedMessages);
  // const renderedMessages = messages.map((message, index) => {

    // return (
    //   <MessageListItem key={index} message={message} postId={postId} />
    //   )
    // })

  return (
    <section className="UserMessagesList">
      Test
      {content}
      {/* {renderedMessages} */}
    </section>
  )
}

export default UserMessagesList;
