import React from 'react'

export default function Input({ text, setText, sendMessage }) {
  return (
    <div className="Input">
      <form onSubmit={sendMessage} className="chat-form">
        <input type="text" placeholder="Type a message..." value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
