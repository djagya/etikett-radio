import React, { useEffect, useState, useContext } from 'react';
import { useAlert } from 'react-alert';
import InfoBar from './InfoBar';
import Input from './Input';
import Messages from './Messages';
import { Context } from "../Context";

export default function Chat({ name, setName, room, chatWindow, setChatWindow, removeCookie }) {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const { socket } = useContext(Context)
  const alert = useAlert();

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

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
      // socket.off();
    }
  }, [name])

  useEffect(() => {
    // Recieve MESSAGE
    socket.on('message', (message) => {
      setMessages(messages => [...messages, message]);
    })
    
  }, []);

  const sendMessage = e => {
    e.preventDefault();
    if (text) {
      // Emit SENDMESSAGE
      socket.emit('sendMessage', text, () => {
        setText('');
      })
    }
    if (messages.length >= 50) {
        removeFirst();
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
        <div className="chat-responsive-container">
          <Messages messages={messages} name={name} />
          <Input text={text} setText={setText} sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  )
}
