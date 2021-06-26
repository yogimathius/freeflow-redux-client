import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMessages, selectMessagesByUserId } from './messagesSlice'
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
    console.log('fetching messages');
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
    
  console.log('message list: ', messages);
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
