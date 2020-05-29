import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import './videoStream.scss'
import audio from './icons/audio.png';
import mute from './icons/mute.png';

export default function VideoStream(props) {

    useEffect(() => {
        if (window.location.pathname !== '/') {
            videoPlayer.current.wrapper.classList.add('rePosition');
            coverControls.current.classList.add('rePosition');
            setWidth(20);
            setHeight(20);
        } else {
            videoPlayer.current.wrapper.classList.remove('rePosition');
            coverControls.current.classList.remove('rePosition');
            setWidth(100);
            setHeight(94);
        }

    }, [window.location.pathname])

    const [playing, setPlaying] = useState(true);
    const [volume, setVolume] = useState("0.5");
    const [muted, setMuted] = useState(false);
    const [icon, setIcon] = useState(audio);
    const [width, setWidth] = useState(100);
    const [height, setHeight] = useState(94);
    const streamControls = useRef();
    const videoPlayer = useRef();
    const coverControls = useRef();

    const handlePlayBtn = e => {
        e.target.classList.toggle('paused')
        setPlaying(!playing);
    }

    const handleAudio = () => {
        // Mute audio
        setMuted(!muted)

        // Change icon
        if (muted) {
            setIcon(audio);
            setVolume(0.5);
        } else {
            setIcon(mute);
            setVolume(0);
        }        
    }

    const handleVolume = e => {
        setVolume(e.target.value);
        if(parseFloat(volume) < 0.15) {
            setMuted(true);
            setIcon(mute);
        } else {
            setMuted(false);
            setIcon(audio);
        }
    }

    return (
        <section className="playerContrainer">
            <div className="embededVideo">
                <ReactPlayer 
                    className="ReactPlayer"
                    url="https://www.twitch.tv/chillhopmusic"
                    playing={playing} 
                    volume={parseFloat(volume)} 
                    muted={muted}
                    ref={videoPlayer}
                    width={`${width}%`}
                    height={`${height}vh`}
                />
                <div className="coverControls" ref={coverControls} style={{width: `${width}%`, height: `${height}vh`}}></div>
            </div>

            <section className="streamControls" ref={streamControls}>
                <button className="playPauseBtn paused" onClick={handlePlayBtn}></button>
                <img className="audioIcon" src={icon} alt="speaker icon" width="18" onClick={handleAudio} />
                <input className="volumeControl" type="range" min="0" max="1" step="any" value={volume} onChange={handleVolume} />
                
                {/* Options */}
                {/* Message with stream title and description: */}
                {/* <span>etikett radio - stream description</span> */}
                {/* Show news like feed/updates */}
                {/* <div className="block"></div> */}

            </section>
        </section>
    )
}
