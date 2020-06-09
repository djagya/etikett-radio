import React from 'react'

export default function InfoBar({ room }) {
  return (
    <div className="InfoBar">
      <div className="left-inner-container">
        <button className="minimize">-</button>
      </div>
      <h3>{room}</h3>
      <div className="roght-inner-container">
        <button className="close">x</button>
      </div>
    </div>
  )
}
