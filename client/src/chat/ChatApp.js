
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import './ChatApp.scss';
import Join from './Join';
import Chat from './Chat';

function ChatApp({ setChatState, location }) {
  const [name, setName] = useState('');
  const [chatWindow, setChatWindow] = useState('chat-app-chat')
  const room = 'etikett radio';

  useEffect(() => {
    const name = sessionStorage.getItem('name');
    if (name) {
      setName(name);
    }
  }, [name])

  useEffect(() => {
    console.log('router changed to: ', location.pathname );
    if (location.pathname === '/') {
      setChatState('chat-homescreen');
    } else {
      setChatState('chat-routes');
    }
  }, [location.pathname])

  return (
    name
      ? (
        <div className={`ChatApp ${chatWindow}`}>
          <Chat name={name} setName={setName} room={room} chatWindow={chatWindow} setChatWindow={setChatWindow} />
        </div>
      )
      : (
        <div className="ChatApp chat-app-join">
          <Join setName={setName} />
        </div>
      )
  );
}


export default withRouter(ChatApp);