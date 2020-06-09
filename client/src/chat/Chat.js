import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import InfoBar from './InfoBar';
import Input from './Input';
import Messages from './Messages';

let socket;

export default function Chat({ name, room, setChatState, chatWindow, setChatWindow }) {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  // Set server address
  const endpoint = 'localhost:3000';

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

  const closeChat = e => {
    socket.emit('disconnect');
    socket.off();
    setChatState('chat-close');
    sessionStorage.removeItem('name');
  }

  return (
    <div className="outer-container">
      <div className="inner-container">
        <InfoBar room={room} closeChat={closeChat} chatWindow={chatWindow} setChatWindow={setChatWindow} />
        <Messages messages={messages} name={name} />
        <Input text={text} setText={setText} sendMessage={sendMessage} />
      </div>
    </div>
  )
}
