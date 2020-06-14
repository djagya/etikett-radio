import React, { useState, useEffect, useRef, useContext  } from 'react';
import { useAlert } from 'react-alert';
import ReactPlayer from 'react-player';
import audioIcon from './icons/audio.png';
import muteIcon from './icons/mute.png';
import { withRouter, NavLink } from 'react-router-dom';
import ChatApp from './chat/ChatApp';
import GetData from "./GetData";
import { Context } from "./Context";
import moment from "moment";

function Header(props) {
    const context = useContext(Context)
    const alert = useAlert();
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState("0.5");
    const [muted, setMuted] = useState(false);
    const [icon, setIcon] = useState(audioIcon);
    const [headerSize, setHeaderSize] = useState('');
    const [chatState, setChatState] = useState('chat-homescreen');
    const [source, setSource] = useState('http://s9.myradiostream.com:44782/listen.mp3');
    const videoPlayer = useRef();
    const video = 'https://www.twitch.tv/austinjohnplays/';
    // Stream that is only available on sundays (for testing): https://www.twitch.tv/austinjohnplays/
    // const video = 'https://www.twitch.tv/truthmusic';

    useEffect(() => {

        // Cheack for video
        if (ReactPlayer.canPlay(video)) {
            setSource(video);
        }

        // If there's video and we are on homescreen
        if (source === video && props.location.pathname === '/') {
            setHeaderSize('full-header');
            setChatState('chat-homescreen')

        // If there's no video
        } else if (source !== video) {
            setHeaderSize('small-header');
            setChatState('chat-routes')
        }
    }, [])

    useEffect(() => {
        if (source == video) {

            // Change header depending on route if there's video
            if (props.location.pathname !== '/') {
                setHeaderSize('small-header');
            } 
            else if (props.location.pathname === '/' && source === video) {
                setHeaderSize('full-header');
            }    
        }
    }, [props.location.pathname])


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
        if (parseFloat(volume) < 0.15) {
            setMuted(true);
            setIcon(muteIcon);
        } else {
            setMuted(false);
            setIcon(audioIcon);
        }
    }

    ////////////////
    //For InfoBar
    ////////////////
    useEffect(() => {
    GetData("http://localhost:3000/infobar")
    .then(data => {
        if (!data.success) alert.error("Failed to fetch data, please contact an admin.");
        if (data.status ===403) {
            alert.error("Status 403: Forbidden") 
            return
        }
        if (!data.success) {
            alert.error("Failed to fetch data, please contact an admin")
            return
        };
        context.setInfoBarMessage(data.infoBar[0].message)
        context.setInfoID(data.infoBar[0]._id)
    })
    },  [])

    ////////////////
    //Clock 
    ////////////////
    const [time,setTime] = useState( moment().format("h:mm:ss a"))
    const timer = () => setTime( moment().format("H:mm:ss"))
    useEffect(
        () => {

            const id = setInterval(timer, 1000);
            return () => clearInterval(id);
        },[time]);

    return (
        <header className={`App-header ${headerSize}`}>

            <nav role="navigation">
                <NavLink className="nav-link" to="/">home.</NavLink>
                <NavLink className="nav-link" to="/schedule">schedule.</NavLink>
                <NavLink className="nav-link" to="/archive">archive.</NavLink>
                <NavLink className="nav-link" to="/blog">blog.</NavLink>
                <NavLink className="nav-link" to="/hosts">hosts.</NavLink>
                <NavLink className="nav-link" to="/contact">contact.</NavLink>
                <NavLink className="nav-link" to="/login">staff only.</NavLink>
            </nav>

            <div className={`chat ${chatState}`}>
                <ChatApp />
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
                        <button className="playPauseBtn paused" onClick={handlePlayBtn} role="play-pause button"></button>
                        <img className="audio-icon" src={icon} alt="speaker icon" width="18" onClick={handleAudio} />
                        <input className="volumeControl" type="range" min="0" max="1" step="any" value={volume} onChange={handleVolume} role="volume" />
                    </div>
                    : null}
                <div className="message">
                    <span className="moving-text"> {time} +++ {context.infoBarMessage}</span>
                </div>

            </section>
        </header>
    )
}

export default withRouter(Header);