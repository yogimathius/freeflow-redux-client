/* eslint-disable react/prop-types */
import React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'

export const TimeAgo = ({ timestamp }) => {
  let timeAgo = ''
  if (timestamp) {
    const date = parseISO(timestamp)
    const timePeriod = formatDistanceToNow(date, { includeSeconds: true })
    timeAgo = `${timePeriod} ago`
  }

  return (
    <span className="text-gray-500 mb-2" title={timestamp}>
     <i>{timeAgo}</i>
    </span>
  )
}
