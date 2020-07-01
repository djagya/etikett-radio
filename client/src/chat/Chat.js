import React, { useEffect, useState, useContext } from 'react';
import { useAlert } from 'react-alert';
import InfoBar from './InfoBar';
import Input from './Input';
import Messages from './Messages';
import { Context } from "../Context";
import autosize from "autosize";
import { contextsKey } from 'express-validator/src/base';

export default function Chat({ name, setName, room, chatWindow, setChatWindow, removeCookie }) {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const { socket, setOnChat, chatHeight, setChatHeight, chatRef, setChatRef } = useContext(Context)
  const alert = useAlert();
  const [bottomSpace, setBottomSpace] = useState(0);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    if (chatWindow !== 'chat-app-chat') {
      setChatWindow('chat-app-chat');
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
    if (chatHeight > 87 ) {
      return
    } else {
      setBottomSpace(chatHeight-32+"px")
    }
  }, [chatHeight])



 autosize(chatRef)
 useEffect(() => {
   if (!chatRef) return
  setChatHeight(chatRef === null ? 0 : parseInt(chatRef.style.height.substring(0, 3)))

})

  const sendMessage = e => {
    e.preventDefault();
    if (text) {
      // Emit SENDMESSAGE
      socket.emit('sendMessage', text, () => {
        setText('');
        autosize.destroy(chatRef)
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
      <div className="inner-container" onMouseEnter={()=>{setOnChat(true)}} onMouseLeave={()=>{setOnChat(false)}}>
        <InfoBar room={room} chatWindow={chatWindow} setChatWindow={setChatWindow} setName={setName} />
        <Messages messages={messages} name={name} bottomSpace={bottomSpace} />
        <Input text={text} setText={setText} sendMessage={sendMessage} />
      </div>
    </div>
  )
}
