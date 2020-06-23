import React, { useState, useEffect } from 'react'

export default function Input({ rows, text, setText, sendMessage }) {

  return (
    <div className="Input">
      <form onSubmit={sendMessage} className="chat-form button-container">
        <textarea rows={rows} id="input-message-textarea" onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null} maxLength="500" type="text" placeholder="Type a message..." value={text} onChange={(e) => setText(e.target.value)} />
        <button className="chat-button" type="submit" >send</button>
      </form>
    </div>
  )
}
