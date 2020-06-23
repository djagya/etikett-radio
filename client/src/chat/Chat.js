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
  const [rows, setRows] = useState(1);
  const [bottomSpace, setBottomSpace] = useState(0);

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

  useEffect(() => {
    const charLength = 27;
    if (text.length >= charLength * 2) {
      setRows(3)
      setBottomSpace('2.3rem')
    } else if (text.length >= charLength) {
      setRows(2)
      setBottomSpace('0.8rem')
    } else {
      setRows(1)
      setBottomSpace('0rem')
    }
  }, [text])

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
        <Messages messages={messages} name={name} bottomSpace={bottomSpace} />
        <Input rows={rows} text={text} setText={setText} sendMessage={sendMessage} />
      </div>
    </div>
  )
}
