import React, { useState, useEffect, useContext } from 'react'
import { Context } from "../Context";
import moment from "moment";


export default function MessageControls({ source, radio, icon, volume, handlePlayBtn, handleAudio, handleVolume }) {
  const context = useContext(Context);
  const [time, setTime] = useState(moment().format("h:mm:ss a"))
  const timer = () => setTime(moment().format("H:mm:ss"))

  useEffect(() => {
    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
  }, [time]);

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
