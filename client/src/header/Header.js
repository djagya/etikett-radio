import React, { useState, useEffect, useRef, useContext } from 'react';
import { useAlert } from 'react-alert';
import audioIcon from '../icons/audio.png';
import muteIcon from '../icons/mute.png';
import { withRouter } from 'react-router-dom';
import ChatApp from '../chat/ChatApp';
import { Context } from "../Context";
import ResponsiveNavbar from './ResponsiveNavbar';
import Stream from './Stream';
import DesktopNavbar from './DesktopNavbar';
import RadioControls from './RadioControls';
import Loading from '../loading/Loading';
import microphone from '../icons/microphone.png';
import clapperboard from '../icons/clapperboard.png';
import MessageBar from './MessageBar';

function Header({ location, name, setName, isMobileWidth, isMobileDevice }) {
    const context = useContext(Context)
    const videoPlayer = useRef();

    // Currently not streaming example
    const channelId = '521258416';
    const video = 'https://www.twitch.tv/etikett_radio';

    // Currently sreaming example
    // const channelId = '274901255';
    // const video = 'https://www.twitch.tv/truthmusic';

    const radio = 'https://s9.myradiostream.com/44782/listen.mp3';

    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState("0.5");
    const [muted, setMuted] = useState(false);
    const [icon, setIcon] = useState(audioIcon);
    const [headerSize, setHeaderSize] = useState('');
    const [chatState, setChatState] = useState('chat-homescreen-with-video');
    const [source, setSource] = useState(radio);
    const [loading, setLoading] = useState(false);
    const [showSourceBtn, setShowSourceBtn] = useState(false);
    const [buttonIcon, setButtonIcon] = useState(null);
    const [buttonText, setButtonText] = useState(null);

    useEffect(() => {
        context.setPathName(location.pathname)

    }, [context.setPathName, location.pathname])

    
    useEffect(() => {
        setLoading(true);
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
            .then(()=>{
                if (isMobileWidth) {
                    context.setGapClass("small-gap")
                } else {
                    context.setGapClass("big-gap")
                }
            })
            .then(() => {
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                setSource(radio);
            })

    }, [isMobileDevice])


    useEffect(() => {
        const setHeaderChatGapSize = () => {

            // If there's video and we are on homescreen
            if (source === video && location.pathname === '/') {
                setHeaderSize('full-header');
                setChatState('chat-homescreen-with-video');
    
            } 
            else {
                setHeaderSize('small-header');
                setChatState('chat-routes-with-video');
            }
        }
        setHeaderChatGapSize();
    }, [source, location.pathname])

    useEffect(() => {
        // Set button icon
        if (source === video) {
            setButtonIcon(microphone);
            setButtonText('Radio');
        } else {
            setButtonIcon(clapperboard);
            setButtonText('Video');
        }
        // Pause player
        setPlaying(false)
    }, [source])


    const handlePlayBtn = e => {
        if (playing) {
            e.target.classList.remove('paused');
            setPlaying(false);
        } else {
            e.target.classList.add('paused');
            setPlaying(true);
        }
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
        loading ? <Loading /> : 
            
            <header className={`App-header ${headerSize}`}>
                {source === video && location.pathname === "/" ? 
                    <a className="catalyst-full-header" href="https://catalyst-berlin.com/" title="Catalyst" target="_blank" rel="noopener noreferrer">
                        <img src={require("../img/Catalyst/Icon_neg@2x.png")} alt="Logo of Catalyst: A big C followed by three slashes." />
                    </a> 
                :null}
                <div className="video-or-logo"> 

                    

                    
                    {source === radio ?
                        <div className="logo-and-controls"> 
                            <a href="https://catalyst-berlin.com/" title="Catalyst" target="_blank" rel="noopener noreferrer">
                                <img src={require("../img/Catalyst/Icon_neg@2x.png")} alt="Logo of Catalyst: A big C followed by three slashes." />
                            </a> 
                                <RadioControls 
                                    source={source} 
                                    radio={radio} 
                                    icon={icon} 
                                    volume={volume} 
                                    handlePlayBtn={handlePlayBtn} 
                                    handleAudio={handleAudio} 
                                    handleVolume={handleVolume}
                                />
                        </div>
                    : null}
                    <Stream source={source} playing={playing} volume={volume} videoPlayer={videoPlayer} />
                </div>
                <div className="nav-and-message-bar">
                    {isMobileWidth ? <ResponsiveNavbar /> : <DesktopNavbar /> }
                    <MessageBar />
                </div>
                <div className={`chat ${chatState}`}> <ChatApp name={name} setName={setName} /> </div>
                {showSourceBtn ? 
                    <button className="change-source-btn" onClick={() => source === video ? setSource(radio) : setSource(video)}>
                        <img src={buttonIcon} width="24" alt="icon"/>
                        <span>{buttonText}</span>
                    </button>
                 : null} 
                    
            </header>
            
    )
}

export default withRouter(Header);