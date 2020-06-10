import React from 'react'
// Icons
import minimize from '../icons/minimize.png';

export default function InfoBar({ room, chatWindow, setChatWindow }) {
  const handleChatWindow = () => {
    if (chatWindow === 'chat-app-chat') {
      setChatWindow('chat-app-minimize');
    } else {
      setChatWindow('chat-app-chat');
    }
  }

  return (
    <div className="InfoBar">
      <div className="info-inner-container">
        <img src={minimize} alt="minimize icon" onClick={handleChatWindow} />
      </div>
      <h3>{room}</h3>
      <div className="info-inner-container">
      </div>
    </div>
  )
}

// Icons made by <a href="https://www.flaticon.com/authors/chanut" title="Chanut">Chanut</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
