
import React, { useEffect, useState } from 'react';
import './ChatApp.scss';
import Join from './Join';
import Chat from './Chat';

function ChatApp({ setChatState }) {
  const [name, setName] = useState('');
  const [chatWindow, setChatWindow] = useState('chat-app-chat')
  const room = 'etikett radio';

  useEffect(() => {
    const name = sessionStorage.getItem('name');
    if (name) {
      setName(name);
    }
  }, [name])

  return (
    name
      ? (
        <div className={`ChatApp ${chatWindow}`}>
          <Chat name={name} room={room} setChatState={setChatState} chatWindow={chatWindow} setChatWindow={setChatWindow} />
        </div>
      )
      : (
        <div className="ChatApp chat-app-join">
          <Join setName={setName} />
        </div>
      )
  );
}


export default ChatApp;