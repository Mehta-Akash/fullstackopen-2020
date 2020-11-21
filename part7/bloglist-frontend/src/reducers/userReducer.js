import loginService from '../services/login'
import storage from '../utils/storage'
import { setNotification } from '../reducers/notificationReducer'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const userLogin = (userDetails) => {
  return async (dispatch) => {
    let user
    try {
      user = await loginService.login(userDetails)
      storage.saveUser(user)
      dispatch(setNotification(`${user.name} welcome back!`))
      dispatch({
        type: 'LOGIN',
        data: user,
      })
    } catch (exception) {
      dispatch(setNotification('wrong username/password', 'error'))
    }
  }
}

export const loginFromStorage = (user) => {
  return {
    type: 'LOGIN',
    data: user,
  }
}

export const userLogout = () => {
  return {
    type: 'LOGOUT',
    // data: null,
  }
}

export default reducer
