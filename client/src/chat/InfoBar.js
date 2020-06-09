import React from 'react'
// Icons
import minimize from '../icons/minimize.png';
import close from '../icons/close.png';

export default function InfoBar({ room, closeChat, chatWindow, setChatWindow }) {
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
        <img src={close} alt="close icon" onClick={closeChat} />
      </div>
    </div>
  )
}

// Icons made by <a href="https://www.flaticon.com/authors/chanut" title="Chanut">Chanut</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
