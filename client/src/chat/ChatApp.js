
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Join from './Join';
import Chat from './Chat';

function ChatApp({ name, setName }) {
  const [chatWindow, setChatWindow] = useState('chat-app-chat');
  const [cookies, setCookie, removeCookie] = useCookies(['user', 'name']);
  const room = 'etikett chat';
  useEffect(() => {
    throw new Error('Chat could not load. Try reloading the page, or contact an admin.')
  }, [])
  useEffect(() => {
    const name = cookies.name;
    if (name) {
      setName(name);
    }
  }, [name])

  return (
    name
      ? (
        <div className={`ChatApp ${chatWindow}`}>
          <Chat name={name} setName={setName} room={room} chatWindow={chatWindow} setChatWindow={setChatWindow} removeCookie={removeCookie} />
        </div>
      )
      : (
        <div className="ChatApp chat-app-join">
          <Join setName={setName} setCookie={setCookie} />
        </div>
      ) 
  );
}


export default withRouter(ChatApp);