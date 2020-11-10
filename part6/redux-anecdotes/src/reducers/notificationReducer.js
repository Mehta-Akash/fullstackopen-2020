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

export const setNotification = (content, time) => {
  return async dispatch => {
    const delay = time * 1000
    
    dispatch( {
      type: 'SHOW_NOTIFICATION',
      data: content
    })

    await setTimeout(() => {
      dispatch(hideNotification())
    }, delay)
    
  }
}

export default reducer
