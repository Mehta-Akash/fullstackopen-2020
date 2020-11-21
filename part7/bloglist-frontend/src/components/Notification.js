import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  // if (!notification) {
  //   return null
  // }

  const notification = useSelector((state) => state.notification)

  const style = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    // color: notification.type === 'success' ? 'green' : 'red',
    background: 'lightgrey',
  }

  console.log('Notification in the Notification component is:', notification)

  return (
    <div>
      {notification ? (
        <div style={style}>{notification}</div>
      ) : (
        <div>{notification}</div>
      )}
    </div>
  )
}

export default Notification
