const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data
    case 'HIDE_NOTIFICTION':
      return ''
    default:
      return state
  }
}

export const showNotification = (content) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: content,
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICTION',
  }
}

export default reducer
