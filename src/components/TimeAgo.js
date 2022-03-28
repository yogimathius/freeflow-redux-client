/* eslint-disable react/prop-types */
import React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'

export const TimeAgo = ({ timestamp }) => {
  let timeAgo = ''
  if (timestamp) {
    const date = parseISO(timestamp)
    const timePeriod = formatDistanceToNow(date, { includeSeconds: true })
    timeAgo = `${timePeriod}`
  }

  const condensedTimeAgo = timeAgo.replace('about', '').replace('ear', '').replace('our', '').split(' ').join('')

  return (
    <span className="text-gray-500" title={timestamp}>
     <i>{condensedTimeAgo}</i>
    </span>
  )
}
