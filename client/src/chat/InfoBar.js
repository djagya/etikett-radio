import React from 'react'
// Icons
import minimize from '../icons/minimize.png';

export default function InfoBar({ room, chatWindow, setChatWindow, setName, removeCookie }) {
  const handleChatWindow = () => {
    if (chatWindow === 'chat-app-chat') {
      setChatWindow('chat-app-minimize');
    } else {
      setChatWindow('chat-app-chat');
    }
  }

  const handleLogOut = () => {
    removeCookie('name');
    setName(null);
  }

  return (
    <div className="InfoBar">
      <div className="info-inner-container">
        <img src={minimize} alt="minimize icon" onClick={handleChatWindow} role="button" />
      </div>
      {/* <div className="h3-container"> */}
        <h3>{room}</h3>
      {/* </div> */}
      <div className="button-container">
        <button id="chat-logout" className="chat-button" onClick={handleLogOut} >log out</button>
      </div>
    </div>
  )
}

// Icons made by <a href="https://www.flaticon.com/authors/chanut" title="Chanut">Chanut</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
