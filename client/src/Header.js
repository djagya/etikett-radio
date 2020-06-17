import React, { useState, useEffect, useRef, useContext } from 'react';
import { useAlert } from 'react-alert';
import ReactPlayer from 'react-player';
import audioIcon from './icons/audio.png';
import muteIcon from './icons/mute.png';
import { withRouter, NavLink } from 'react-router-dom';
import ChatApp from './chat/ChatApp';
import GetData from "./GetData";
import { Context } from "./Context";
import moment from "moment";
import ResponsiveNavbar from './ResponsiveNavbar';

function Header({ location, name, setName, isMobile }) {
    const context = useContext(Context)
    const alert = useAlert();
    const videoPlayer = useRef();

    // Currently not streaming example
    // const channelId = '521258416';
    // const video = 'https://www.twitch.tv/etikett_radio';

    // Currently sreaming example
    const channelId = '274901255';
    const video = 'https://www.twitch.tv/truthmusic';

    // const radio = 'http://s9.myradiostream.com:44782/listen.mp3';
    const radio = 'https://geekanddummy.com/wp-content/uploads/2014/01/2-Kids-Laughing.mp3'
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState("0.5");
    const [muted, setMuted] = useState(false);
    const [icon, setIcon] = useState(audioIcon);
    const [headerSize, setHeaderSize] = useState('');
    const [chatState, setChatState] = useState('chat-homescreen');
    const [source, setSource] = useState(radio);
    const [loading, setLoading] = useState(true);

    context.setPathName(location.pathname)

    useEffect(() => {
        const options = {
            headers: {
                'Accept': 'application/vnd.twitchtv.v5+json',
                'Client-ID': 'gp762nuuoqcoxypju8c569th9wz7q5',
                'Authorization': 'Bearer mz2js4nc3yjfywkj04p5bhivieycjm'
            }
        }

        fetch(`https://api.twitch.tv/helix/streams?user_id=${channelId}`, options)
            .then(res => res.json())
            .then(streamData => {
                if (!streamData.data[0]) {
                    return
                }
                if (streamData.data[0].type === "live" && !isMobile) {
                    setSource(video)
                }
            })
            .then(() => {
                if (source === video && location.pathname === '/') {
                    setHeaderSize('full-header');
                    setChatState('chat-homescreen');
                    context.setGapClass("big-gap");
                    // If there's no video
                } else if (source !== video) {
                    setHeaderSize('small-header-without-video');
                    setChatState('chat-routes');
                    context.setGapClass("small-gap");
                } else {
                    setHeaderSize('small-header-with-video');
                    setChatState('chat-routes');
                    context.setGapClass("big-gap");
                }
                setLoading(false);
            })

    }, [source])


    useEffect(() => {

        // If there's video and we are on homescreen
        if (source === video && location.pathname === '/') {
            setHeaderSize('full-header');
            setChatState('chat-homescreen');

            // If there's no video
        } else if (source !== video) {
            setHeaderSize('small-header-without-video');
            setChatState('chat-routes');
        } else {
            setHeaderSize('small-header-with-video');
            setChatState('chat-routes');
        }

        // I thought this would create an infinite loop, but it works ¯\_(ツ)_/¯
    }, [source, location.pathname])

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
                if (data.status === 403) {
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
    }, [])

    ////////////////
    //Clock 
    ////////////////
    const [time, setTime] = useState(moment().format("h:mm:ss a"))
    const timer = () => setTime(moment().format("H:mm:ss"))
    useEffect(
        () => {

            const id = setInterval(timer, 1000);
            return () => clearInterval(id);
        }, [time]);

    return (
        loading
            ? (
                null
            )
            : (
                <header className={`App-header ${headerSize}`}>
                    {isMobile ? <ResponsiveNavbar /> :
                        <nav role="navigation">
                            <NavLink activeClassName="active-nav" className="nav-link" exact={true} to="/">home.</NavLink>
                            <NavLink activeClassName="active-nav" className="nav-link" to="/schedule">schedule.</NavLink>
                            <NavLink activeClassName="active-nav" className="nav-link" to="/archive">archive.</NavLink>
                            <NavLink activeClassName="active-nav" className="nav-link" to="/blog">blog.</NavLink>
                            <NavLink activeClassName="active-nav" className="nav-link" to="/hosts">hosts.</NavLink>
                            <NavLink activeClassName="active-nav" className="nav-link" to="/contact">contact.</NavLink>
                            <NavLink activeClassName="active-nav" className="nav-link" to="/login">staff only.</NavLink>
                        </nav>
                    }

                    {isMobile ? null :
                        <div className={`chat ${chatState}`}>
                            <ChatApp name={name} setName={setName} />
                        </div>
                    }

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
                        {source === radio ?
                            <div className="player-controls">
                                <button className="playPauseBtn paused" onClick={handlePlayBtn} role="play-pause button"></button>
                                <img className="audio-icon" src={icon} alt="speaker icon" width="18" onClick={handleAudio} />
                                <input className="volumeControl" type="range" min="0" max="1" step="any" value={volume} onChange={handleVolume} role="volume" />
                            </div>
                            : null}
                        <div className="message">
                            <span className="moving-text"> {time} -- {context.infoBarMessage}</span>
                        </div>

                    </section>
                </header>
            )
    )
}

export default withRouter(Header);