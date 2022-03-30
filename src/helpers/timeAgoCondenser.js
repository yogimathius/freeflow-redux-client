export const timeAgoCondenser = (timeAgo) => {
  return timeAgo.replace('about', '').replace('ear', '').replace('our', '').replace('ays', '').replace('onths', '').split(' ').join('')
}
