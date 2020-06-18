import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import io from 'socket.io-client';
import InfoBar from './InfoBar';
import Input from './Input';
import Messages from './Messages';

let socket;

export default function Chat({ name, setName, room, chatWindow, setChatWindow, removeCookie }) {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const alert = useAlert();

  // Set server address
  const endpoint = 'localhost:3000';

  useEffect(() => {
    console.log('[useEffect on Chat is running]')
    // Connect to endpoint
    socket = io(endpoint);

    // Emit JOIN
    socket.emit('join', { name, room }, (error) => {
      if (error) {
        removeCookie('name');
        alert.error(error, {
          onClose: () => {
            window.location.reload()
          }
        })
      }
    });

    return () => {
      // Emit DISCONNECT
      socket.emit('disconnect');
      // Turn off this socket
      socket.off();
      console.log('[chat will unmount]')
    }
  }, [endpoint, /* sessionStorage */])

  useEffect(() => {
    console.log('[useEffect[messages]]')
    // Recieve MESSAGE
    socket.on('message', (message) => {
      setMessages(messages => [...messages, message]);
    })
    
  }, []);

  const sendMessage = e => {
    console.log('[send message is running]')
    e.preventDefault();
    if (text) {
      // Emit SENDMESSAGE
      socket.emit('sendMessage', text, () => {
        setText('');
      })
    }
    if (messages.length >= 50) {
        removeFirst();
        console.log(messages.length)
    } 
  };

  const removeFirst = () => {
    const [first, ...rest] = messages;
    return setMessages(rest);
  };

  return (
    <div className="outer-container">
      <div className="inner-container">
        <InfoBar room={room} chatWindow={chatWindow} setChatWindow={setChatWindow} setName={setName} />
        <Messages messages={messages} name={name} />
        <Input text={text} setText={setText} sendMessage={sendMessage} />
      </div>
    </div>
  )
}
