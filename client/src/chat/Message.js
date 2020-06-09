import React, { useState } from 'react'

export default function Message({ message: { user, text }, name }) {
  // const [isSentByUser, setIsSentByUser] = useState(false);
  const trimmedName = name.trim().toLocaleLowerCase();
  let isSentByUser = true;

  if (user === trimmedName) {
    let isSentByUser = true;
  }

  return (
    isSentByUser
    ? (
      <div className="message-container justify-end">
        <p className="sent-text">{trimmedName}</p>
        <div className="message-box bg-dark">
          <p className="message-text color-white">{text}</p>
        </div>
      </div>
    )
    : (
      <div className="message-container justify-end">
        <div className="message-box bg-dark">
          <p className="message-text color-black">{text}</p>
        </div>
        <p className="sent-text">{user}</p>
      </div>
    )
  )
}
