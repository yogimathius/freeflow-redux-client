/* eslint-disable no-tabs */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'

// import Autocomplete from "../../helpers/Autocomplete";
import Select from 'react-select'
import { selectAllUsers } from '../../reducers/usersSlice'
import SelectedUserConversation from './SelectedUserConversation'
// import UserConversationListItem from './messagerNameItem'
import { setSelectedUser } from '../../reducers/selectedUserSlice'

const UsernameSelector = ({ sortedMessages, userId, messagers, currentPage, setCurrentPage, url, path }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const users = useSelector(selectAllUsers)

  const usernameOptions = []
  const usernames = users.forEach((user, index) => {
    const username = user.first_name + ' ' + user.last_name
    const usernameOptionObject = { value: username, label: username }
    usernameOptions.push(usernameOptionObject)
  })

  const HandleChange = (selectedUser) => {
    dispatch(setSelectedUser({ selectedUser }))

    const userAlreadyInMessages = messagers.find(messager => messager === selectedUser.value)

    if (userAlreadyInMessages !== undefined) {
      history.push(`${url}/${userAlreadyInMessages}`)
      const userId = users.find(user => {
        return userAlreadyInMessages.includes(user.first_name)
      }).id

      console.log('user id: ', userId, 'current page: ', currentPage, 'messagers: ', messagers, url, '/', userAlreadyInMessages)

      setCurrentPage(userAlreadyInMessages)
      // return (
      //   <Redirect to={{ pathname: `${url}/${userAlreadyInMessages}` }}/>
      // )
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

export default UsernameSelector
