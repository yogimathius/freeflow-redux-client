import React from 'react'
import { VisiblePostsList } from '../../features/posts'

const index = ({ openModal, isDisabled }) => {
  return (
    <VisiblePostsList openModal={openModal} isDisabled={isDisabled}></VisiblePostsList>
  )
}

export default index
