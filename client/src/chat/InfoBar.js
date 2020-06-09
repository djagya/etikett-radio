import React from 'react'
// Icons
import minimize from '../icons/minimize.png';
import close from '../icons/close.png';

export default function InfoBar({ room }) {
  return (
    <div className="InfoBar">
      <div className="info-inner-container">
        <img src={minimize} alt="minimize icon"/>
      </div>
      <h3>{room}</h3>
      <div className="info-inner-container">
        <img src={close} alt="close icon"/>
      </div>
    </div>
  )
}

// Icons made by <a href="https://www.flaticon.com/authors/chanut" title="Chanut">Chanut</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
