import React, {useRef, useContext, useEffect} from 'react';
import autosize from "autosize";
import { Context } from "../Context";

export default function Input({ text, setText, sendMessage }) {
  const input = useRef(null)
  const reference = input.current
  const {setChatHeight} = useContext(Context)
  autosize(reference)

  useEffect(() => {
    setChatHeight(reference === null ? 0 : parseInt(reference.style.height.substring(0, 3)))
  })
  
  return (
    <div className="Input">
      <form onSubmit={sendMessage} className="chat-form button-container">
        <textarea ref={input} id="input-message-textarea" onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null} maxLength="500" type="text" placeholder="Type a message..." value={text} onChange={(e) => setText(e.target.value)} />
        <button className="chat-button chat-send" type="submit" >send</button>
      </form>
    </div>
  )
}
