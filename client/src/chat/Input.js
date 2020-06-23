import React, { useState, useEffect } from 'react'

export default function Input({ text, setText, sendMessage }) {
  const [rows, setRows] = useState(1);

  useEffect(() => {
    const charLength = 23;
    if (text.length >= charLength * 2) {
      setRows(3)
    } else if (text.length >= charLength) {
      setRows(2)
    } else {
      setRows(1)
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
