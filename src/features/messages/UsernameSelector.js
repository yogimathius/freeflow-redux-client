/* eslint-disable no-tabs */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, withRouter } from 'react-router-dom'

// import Autocomplete from "../../helpers/Autocomplete";
import Select from 'react-select'
import { selectAllUsers } from '../../reducers/usersSlice'
import SelectedUserConversation from './SelectedUserConversation'
// import UserConversationListItem from './messagerNameItem'
import { setSelectedUser } from '../../reducers/selectedUserSlice'
import { addUserConversation } from '../../reducers/userConversationsSlice'

const UsernameSelector = ({ sortedMessages, userId, messagers, currentPage, setCurrentPage, url, path }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)

  const usernameOptions = []
  const usernames = users.forEach((user, index) => {
    const username = user.first_name + ' ' + user.last_name
    const userIdInList = user.id
    const usernameOptionObject = { value: { username, userIdInList }, label: username }
    if (userIdInList !== userId) {
      usernameOptions.push(usernameOptionObject)
    }
  })

  const HandleChange = (selectedUser) => {
    const userAlreadyInMessages = messagers.find(messager => messager.name === selectedUser.value.username)

    if (userAlreadyInMessages === undefined) {
      const username = selectedUser.value.username
      console.log(selectedUser)
      dispatch(addUserConversation({ name: username, userId: selectedUser.value.userIdInList }))
      setCurrentPage(username)
      history.push(`${url}/${username}`)
    }

    if (userAlreadyInMessages !== undefined) {
      dispatch(setSelectedUser({ selectedUser }))
      const username = userAlreadyInMessages.name
      setCurrentPage(username)
      history.push(`${url}/${username}`)
    }
  }

  return (
	<div className="w-full">
    <div className="col-start-1 col-span-1">
      <label
        htmlFor="skills"> </label>
      <Select
        onChange={(e) => HandleChange(e)}
        placeholder="Compose Message..."
        value={usernames || null}
        defaultValue="Compose Message..."
        name="usernames"
        options={usernameOptions}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </div>
	</div>
  )
}

export default withRouter(UsernameSelector)
