
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Join from './Join';
import Chat from './Chat';

function ChatApp({ setChatState, location }) {
  const [name, setName] = useState('');
  const [chatWindow, setChatWindow] = useState('chat-app-chat')
  const [enableChat, setEnableChat] = useState(true);
  const room = 'etikett chat';

  useEffect(() => {
    const name = sessionStorage.getItem('name');
    if (name) {
      setName(name);
    }
  }, [name])

  useEffect(() => {
    if (location.pathname === '/') {
      setChatState('chat-homescreen');
    } else {
      setChatState('chat-routes');
    }
  }, [location.pathname])

  return (
    enableChat
      ? (
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
      )
      : (
        null
      )
    
  );
}


export default withRouter(ChatApp);