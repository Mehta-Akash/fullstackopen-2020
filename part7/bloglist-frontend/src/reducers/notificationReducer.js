const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIF':
      return ''
    default:
      return state
  }
}

let timeoutID

export const setNotification = (message) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: message,
    })

    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIF',
      })
    }, 5000)
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIF',
      })
    }, 5000)
  }
}

export const clearNotification = () => {
  return { type: 'CLEAR_NOTIF' }
}

export default reducer
