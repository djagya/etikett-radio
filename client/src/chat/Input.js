import React, { useState, useEffect } from 'react'

export default function Input({ text, setText, sendMessage }) {
  const [rows, setRows] = useState(1);

  useEffect(() => {
    if (text.length >= 23 && rows < 2) {
      setRows(2)
    }
  }, [text])

  return (
    <div className="Input">
      <form onSubmit={sendMessage} className="chat-form button-container">

        <textarea rows={rows} id="input-message-textarea" maxLength="500" type="text" placeholder="Type a message..." value={text} onChange={(e) => setText(e.target.value)} />
        <button className="chat-button" type="submit">send</button>
      </form>
    </div>
  )
}
