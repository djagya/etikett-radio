import React, { useContext } from 'react'
import { Context } from "../Context";

export default function MessageControls({ source, radio, icon, volume, handlePlayBtn, handleAudio, handleVolume, time }) {
  const context = useContext(Context);

  return (
    <section className="message-controls-container">
      {source === radio ?
        <div className="player-controls">
            <button className="playPauseBtn" onClick={handlePlayBtn} role="play-pause button"></button>
            <img className="audio-icon" src={icon} alt="speaker icon" width="18" onClick={handleAudio} />
            <input className="volumeControl" type="range" min="0" max="1" step="any" value={volume} onChange={handleVolume} role="volume" />
        </div>
        : null}
      <div className="message">
        <span className="moving-text"> {time} -- {context.infoBarMessage}</span>
      </div>

    </section>
  )
}
