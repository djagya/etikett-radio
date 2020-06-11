import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import './Header.scss';
import audioIcon from './icons/audio.png';
import muteIcon from './icons/mute.png';
import { withRouter, NavLink } from 'react-router-dom';
import ChatApp from './chat/ChatApp';

function Header(props) {
    useEffect(() => {
        // Stream that is only available on sundays (for testing): https://www.twitch.tv/austinjohnplays/
        const video = 'https://www.twitch.tv/truthmusic';
        if (ReactPlayer.canPlay(video)) {
            setSource(video);
        }
    }, [])

    useEffect(() => {
        if (props.location.pathname !== '/') {
            setHeaderSize('small-header');
        } else {
            setHeaderSize('full-header');
        }
    }, [props.location.pathname])

    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState("0.5");
    const [muted, setMuted] = useState(false);
    const [icon, setIcon] = useState(audioIcon);
    const [headerSize, setHeaderSize] = useState('');
    const [source, setSource] = useState('http://s9.myradiostream.com:44782/listen.mp3');
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
            setIcon(audioIcon);
            setVolume(0.5);
        } else {
            setIcon(muteIcon);
            setVolume(0);
        }        
    }

    const handleVolume = e => {
        setVolume(e.target.value);
        if(parseFloat(volume) < 0.15) {
            setMuted(true);
            setIcon(muteIcon);
        } else {
            setMuted(false);
            setIcon(audioIcon);
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
                <NavLink className="nav-link" to="/contact">contact.</NavLink>
                <NavLink className="nav-link" to="/login">staff only.</NavLink>
            </nav>

            <div className={`chat ${props.chatState}`}>
            <ChatApp setChatState={props.setChatState} />
          </div>

            <section className="embeded-video">
                <ReactPlayer 
                    className="ReactPlayer"
                    url={source}
                    playing={playing} 
                    volume={parseFloat(volume)} 
                    muted={false}
                    ref={videoPlayer}
                    width="100%"
                    height="100%"
                />
            </section>

            <section className="message-controls-container">
                {source === 'http://s9.myradiostream.com:44782/listen.mp3' ?
                    <div className="controls">
                        <button className="playPauseBtn paused" onClick={handlePlayBtn}></button>
                        <img className="audioIcon" src={icon} alt="speaker icon" width="18" onClick={handleAudio} />
                        <input className="volumeControl" type="range" min="0" max="1" step="any" value={volume} onChange={handleVolume} />
                    </div>
                : null }
                <div className="message">
                    <span className="moving-text">etikett radio - stream description, which is gonna be a loooong story</span>
                </div>

            </section>
        </header>
    )
}

export default withRouter(Header);