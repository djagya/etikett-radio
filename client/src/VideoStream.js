import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import './App.scss'
import audio from './icons/audio.png';
import mute from './icons/mute.png';
import { withRouter, NavLink } from 'react-router-dom';

function VideoStream(props) {

    useEffect(() => {
        const video = 'https://www.twitch.tv/austinjohnplays/';
        const audio = 'http://s9.myradiostream.com:44782/listen.mp3';
        if (ReactPlayer.canPlay(video)) {
            setSource(video);
        } else {
            setSource(audio);
        }
    }, [])

    useEffect(() => {
        if (props.location.pathname !== '/') {
            setHeaderSize('small-header');
        } else {
            setHeaderSize('full-header');
        }
        console.log(ReactPlayer.canPlay("https://www.twitch.tv/austinjohnplays/"));
    }, [props.location.pathname])

    const [playing, setPlaying] = useState(true);
    const [volume, setVolume] = useState("0.5");
    const [muted, setMuted] = useState(false);
    const [icon, setIcon] = useState(audio);
    const [headerSize, setHeaderSize] = useState('');
    const [source, setSource] = useState('');
    const videoPlayer = useRef();

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
        <header className={`App-header ${headerSize}`}>

            <nav>
                <NavLink className="nav-link" to="/">home.</NavLink>
                <NavLink className="nav-link" to="/schedule">schedule.</NavLink>
                <NavLink className="nav-link" to="/archive">archive.</NavLink>
                <NavLink className="nav-link" to="/blog">blog.</NavLink>
                <NavLink className="nav-link" to="/hosts">hosts.</NavLink>
                <NavLink className="nav-link" to="/user">staff only.</NavLink>
            </nav>

            <section className="embeded-video">
                <ReactPlayer 
                    className="ReactPlayer"
                    url="http://s9.myradiostream.com:44782/listen.mp3"
                    playing={playing} 
                    volume={parseFloat(volume)} 
                    muted={muted}
                    ref={videoPlayer}
                    width="100%"
                    height="100%"
                />
            </section>

            <section className="message-controls-container">
                {source ?
                    <div className="controls">
                        <button className="playPauseBtn paused" onClick={handlePlayBtn}></button>
                        <img className="audioIcon" src={icon} alt="speaker icon" width="18" onClick={handleAudio} />
                        <input className="volumeControl" type="range" min="0" max="1" step="any" value={volume} onChange={handleVolume} />
                    </div>
                : null }
                <div className="message">
                    <span>etikett radio - stream description</span>
                </div>

            </section>
        </header>
    )
}

export default withRouter(VideoStream);