
import React, { useEffect, useState } from 'react';
import './ChatApp.scss';
import Join from './Join';
import Chat from './Chat';

function ChatApp() {
  const [name, setName] = useState('');
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
        <div className="ChatApp chat-app-chat">
          <Chat name={name} room={room} setName={setName} />
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