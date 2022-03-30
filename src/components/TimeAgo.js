/* eslint-disable react/prop-types */
import React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'
import { timeAgoCondenser } from '../helpers/timeAgoCondenser'

export const TimeAgo = ({ timestamp, condensed }) => {
  let timeAgo = ''
  if (timestamp) {
    const date = parseISO(timestamp)
    const timePeriod = formatDistanceToNow(date, { includeSeconds: true })
    timeAgo = `${timePeriod}`
  }

  const condensedTimeAgo = timeAgoCondenser(timeAgo)

  return (
    <span className="text-gray-500" title={timestamp}>
     <i>{condensed ? condensedTimeAgo : timeAgo + ' ago'}</i>
    </span>
  )
}
