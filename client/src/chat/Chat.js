import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

export default function Chat({ name, room }) {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  // Set server address
  const endpoint = 'localhost:5000';

  useEffect(() => {
    console.log('[useEffect on Chat is running]')
    // Connect to endpoint
    socket = io(endpoint);

    // Emit JOIN
    socket.emit('join', {name, room}, (error) => {
      if (error) {
        sessionStorage.removeItem('name');
        alert(error);
        window.location.reload()
      }
    });

    return () => {
      // Emit DISCONNECT
      socket.emit('disconnect');
      // Turn off this socket
      socket.off();
    }
  }, [endpoint, sessionStorage])

  useEffect(() => {
    // Recieve MESSAGE
    socket.on('message', (message) => {
      setMessages([...messages, message])
      
    })
  }, [messages]);

  const sendMessage = e => {
    e.preventDefault();
    if (text) {
      // Emit SENDMESSAGE
      socket.emit('sendMessage', text, () => {
        setText('');
      })
    }
  }
  console.log(messages)

  return (
    <div className="outer-container">
      <div className="inner-container">
        <form onSubmit={sendMessage}>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}
