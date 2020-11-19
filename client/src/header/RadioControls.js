import React from 'react'

export default function RadioControls({ source, radio, icon, volume, handlePlayBtn, handleAudio, handleVolume }) {


    

  return (
    <section className="controls-container">
      {source === radio ?
        <div className="player-controls">
          <button className="playPauseBtn" onClick={handlePlayBtn} role="play-pause button"></button>
          <img className="audio-icon" src={icon} alt="speaker icon" width="18" onClick={handleAudio} />
          <input className="volumeControl" type="range" min="0" max="1" step="any" value={volume} onChange={handleVolume} role="Volume Control" />
        </div>
        : null}

    </section>
  )
}
