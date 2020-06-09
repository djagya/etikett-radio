import React, { useState } from 'react'

export default function Message({ message: { user, text }, name }) {
  // const [isSentByUser, setIsSentByUser] = useState(false);
  const trimmedName = name.trim().toLocaleLowerCase();
  let isSentByUser = false;

  if (user === trimmedName) {
     isSentByUser = true;
  }

  return (
    isSentByUser
    ? (
      <div className="message-container justify-right">
        {/* <p className="sent-text">{trimmedName}</p> */}
        <div className="message-box bg-white">
          <p className="message-text color-white">{text}</p>
        </div>
      </div>
    )
    : (
      <div className="message-container justify-left">
        <p className="sent-text">{user}</p>
        <div className="message-box bg-black">
          <p className="message-text color-black">{text}</p>
        </div>
      </div>
    )
  )
}
