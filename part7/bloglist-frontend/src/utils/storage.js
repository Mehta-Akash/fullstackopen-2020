const storageKey = 'loggedBlogAppUser'

const saveUser = (user) => {
  console.log('saving user to local storage')
  localStorage.setItem(storageKey, JSON.stringify(user))
}
  

const loadUser = () => JSON.parse(localStorage.getItem(storageKey))

const logoutUser = () => {
  console.log('Logging out')
  localStorage.removeItem(storageKey)
}

export default {
  saveUser,
  loadUser,
  logoutUser,
}
