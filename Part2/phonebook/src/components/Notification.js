import React from "react";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className={message.type}>
      {message.message}
    </div>
  )
  // if (message.includes("Information")) {
  //   return <div className={message.type}>{message}</div>;
  // }

  // return <div className="message">{message}</div>;
};

export default Notification;
