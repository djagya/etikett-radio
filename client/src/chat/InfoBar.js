import React, { useContext } from 'react';
import { useCookies } from 'react-cookie';
import { Context } from '../Context';

// Icons
import minimize from '../icons/minimize.png';

export default function InfoBar({ room, chatWindow, setChatWindow, setName }) {
  const [cookies, setCookie, removeCookie] = useCookies(['name', 'user']);
  const { socket } = useContext(Context);

  const handleChatWindow = () => {
    if (chatWindow === 'chat-app-chat') {
      setChatWindow('chat-app-minimize');
    } else {
      setChatWindow('chat-app-chat');
    }
  };

  const handleLogOut = () => {
    removeCookie('name', { path: '/' });
    setName(null);
    socket.disconnect();
  };

  return (
    <div className="InfoBar">
      <div className="info-inner-container">
        <img
          src={minimize}
          alt="minimize icon"
          onClick={handleChatWindow}
          role="button"
        />
      </div>
      {/* <div className="h3-container"> */}
      <h3 onClick={handleChatWindow}>{room}</h3>
      {/* </div> */}
      {cookies.user ? null : (
        <div className="button-container">
          <button
            id="chat-logout"
            className="chat-button"
            onClick={handleLogOut}>
            log out
          </button>
        </div>
      )}
    </div>
  );
}

// Icons made by <a href="https://www.flaticon.com/authors/chanut" title="Chanut">Chanut</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
