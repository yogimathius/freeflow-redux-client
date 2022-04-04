import React from 'react'

const UserImage = () => {
  function getRandomInt () {
    return Math.floor(Math.random() * (10000 - 5)) + 4
  }
  const imgUrl = 'http://graph.facebook.com/v2.5/' + getRandomInt() + '/picture'

  return (
    <img className="inline-block rounded-full p-2 border-2 border-solid border-green-500" alt="avatar" src={imgUrl} />
  )
}

export default UserImage
