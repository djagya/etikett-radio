import React, { useState, useEffect, useRef, useContext } from 'react';
import { useAlert } from 'react-alert';
import audioIcon from '../icons/audio.png';
import muteIcon from '../icons/mute.png';
import { withRouter } from 'react-router-dom';
import ChatApp from '../chat/ChatApp';
import GetData from "../GetData";
import { Context } from "../Context";
import ResponsiveNavbar from './ResponsiveNavbar';
import Stream from './Stream';
import DesktopNavbar from './DesktopNavbar';
import MessageControls from './MessageControls';
import Loading from '../Loading';

function Header({ location, name, setName, isMobileWidth, isMobileDevice }) {
    const context = useContext(Context)
    const alert = useAlert();
    const videoPlayer = useRef();

    // Currently not streaming example
    // const channelId = '521258416';
    // const video = 'https://www.twitch.tv/etikett_radio';

    // Currently sreaming example
    const channelId = '274901255';
    const video = 'https://www.twitch.tv/truthmusic';

    const radio = 'https://s9.myradiostream.com/44782/listen.mp3';

    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState("0.5");
    const [muted, setMuted] = useState(false);
    const [icon, setIcon] = useState(audioIcon);
    const [headerSize, setHeaderSize] = useState('');
    const [chatState, setChatState] = useState('chat-homescreen-with-video');
    const [source, setSource] = useState(radio);
    const [loading, setLoading] = useState(true);
    const [showSourceBtn, setShowSourceBtn] = useState(false);

    context.setPathName(location.pathname)

    useEffect(() => {
        const options = {
            headers: {
                'Accept': 'application/vnd.twitchtv.v5+json',
                'Client-ID': process.env.REACT_APP_TWITCH_CLIENT_ID,
                'Authorization': process.env.REACT_APP_TWITCH_AUTH_KEY
            }
        }

        fetch(`https://api.twitch.tv/helix/streams?user_id=${channelId}`, options)
            .then(res => res.json())
            .then(streamData => {
                if (!streamData.data[0]) {
                    return
                }
                if (streamData.data[0].type === "live" && !isMobileDevice) {
                    setSource(video)
                    setShowSourceBtn(true);
                }
            })
            .then(() => {
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                setSource(radio);
            })

    }, [])


    useEffect(() => {
        setHeaderChatGapSize();
    }, [source, location.pathname])

    const setHeaderChatGapSize = () => {

        // If there's video and we are on homescreen
        if (source === video && location.pathname === '/') {
            setHeaderSize('full-header');
            setChatState('chat-homescreen-with-video');
            context.setGapClass("big-gap");

        // If there's no video
        } else if (source !== video) {
            setHeaderSize('small-header-without-video');
            setChatState('chat-routes-without-video');
            context.setGapClass("small-gap");
        } else {
            setHeaderSize('small-header-with-video');
            setChatState('chat-routes-with-video');
            context.setGapClass("big-gap");
        }
    }

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


    return (
        loading
            ? ( <Loading /> ) : (
                <header className={`App-header ${headerSize}`}>

                    {isMobileWidth ? <ResponsiveNavbar /> : <DesktopNavbar /> }

                        <div className={`chat ${chatState}`}> <ChatApp name={name} setName={setName} /> </div>

                        <Stream source={source} playing={playing} volume={volume} videoPlayer={videoPlayer} />

                        <MessageControls 
                            source={source} 
                            radio={radio} 
                            icon={icon} 
                            volume={volume} 
                            handlePlayBtn={handlePlayBtn} 
                            handleAudio={handleAudio} 
                            handleVolume={handleVolume}
                        />
                        
                        {showSourceBtn ? 
                            <button className="change-source-btn" onClick={() => source === video ? setSource(radio) : setSource(video)} >Change source</button>
                        : null}
                        
                </header>
            )
    )
}

export default withRouter(Header);