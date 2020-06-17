import React from 'react'

export default function Input({ text, setText, sendMessage }) {
  return (
    <div className="Input">
      <form onSubmit={sendMessage} className="chat-form button-container">

        <input type="text" placeholder="Type a message..." value={text} onChange={(e) => setText(e.target.value)} />
        <button className="chat-button" type="submit">send</button>
      </form>
    </div>
  )
}
