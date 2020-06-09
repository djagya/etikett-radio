
import React, { useEffect, useState } from 'react';
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
  }, [sessionStorage])

  return (
    name
      ? (
        <div className="ChatApp">
          <Chat name={name} room={room} />
        </div>
      )
      : (
        <div className="ChatApp">
          <Join setName={setName} />
        </div>
      )
  );
}


export default ChatApp;