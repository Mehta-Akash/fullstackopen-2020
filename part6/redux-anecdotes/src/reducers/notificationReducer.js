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

const timeoutArray = []

export const setNotification = (content, time) => {

  return async dispatch => {
    const delay = time * 1000
    let timeoutID

    dispatch( {
      type: 'SHOW_NOTIFICATION',
      data: content
    })

    timeoutID = await setTimeout(() => {
      dispatch(hideNotification())
    }, delay)

    timeoutArray.push(timeoutID)
    clearTimeout(timeoutArray[timeoutArray.length - 2])
    
  }
}

export default reducer
