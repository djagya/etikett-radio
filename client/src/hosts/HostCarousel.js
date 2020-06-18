import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Context";
import GetData from "../GetData";

import DocumentTitle from 'react-document-title';



export default function Hosts() {
    const context = useContext(Context);
    const [hostData, setHostData] = useState([])
    let filteredData = []
    let sortedData = []

    let [num, setNum] = useState(0)

    useEffect(() => {
        GetData("http://localhost:3000/host")
            .then(data => setHostData(data.host))
    }, [])

    //filter out active hosts
    if (hostData.length !== 0) {
        filteredData = hostData.filter(host => host.isActive === "active")
    }
    //sort active members by hostName
    if (filteredData.length !== 0) {
        sortedData = filteredData.sort((hostA, hostB) => (hostA.hostName < hostB.hostName) ? -1 : 1)
    }


    const renderHost = () => {
        if (sortedData.length === 0) return null
        const host = sortedData[num]

        return (
            <div className="host-shit">
                <input className="carousel-open" type="radio" id={`carousel-${num}`} name="carousel"
                    aria-hidden="true" hidden defaultChecked={true} />

                <div className="carousel-item">
                    <img src={host.hostImg} alt={`Artwork or photo of ${host.hostName}`} className="host-images" width="500px" height="500px" />
                    <div className="host-description">
                        <h3>{host.hostName}</h3>
                        <div className="about-host">
                            <q>{host.description}</q>
                        </div>
                        <div className="social-media-container">
                            {host.youtube === "" ? null : <a href={host.youtube} target="_blank" rel="noopener noreferrer" >
                                <i className="fab fa-youtube-square"></i>
                            </a>}

                            {host.soundcloud === "" ? null : <a href={host.soundcloud} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-soundcloud"></i>
                            </a>}

                            {host.mixcloud === "" ? null : <a href={host.mixcloud} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-mixcloud"></i>
                            </a>}

                            {host.facebook === "" ? null : <a href={host.facebook} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook-square"></i>
                            </a>}

                            {host.instagram === "" ? null : <a href={host.instagram} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram"></i>
                            </a>}

                            {host.twitter === "" ? null : <a href={host.twitter} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-twitter-square"></i>
                            </a>}

                            {host.snapchat === "" ? null : <a href={host.snapchat} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-snapchat-square"></i>
                            </a>}
                        </div>
                        <div className="host-pagelink">
                            {host.otherLink === "" ? null : <a href={host.otherLink} target="_blank" rel="noopener noreferrer">
                                {host.otherName}
                            </a>}
                        </div>



                    </div>
                </div>
            </div>
        )
    }

    const renderSideList = (host, i) => (
        <li key={i} className="side-list-item">
            <label htmlFor={`carousel-${i + 1}`} onClick={() => setNum(i)} className={`side-list-name ${num === i ? "active" : ""}`}>
                {host.hostName}
            </label>
        </li>
    )

    return (
        <DocumentTitle title="Hosts page">
            <div className="hosts">
                <div className={`${context.gapClass} host-page`}>
                    <h2>hosts.</h2>

                    <div className="host-content">
                        <ol className="side-list">
                            {sortedData.map((host, i) => renderSideList(host, i))}
                        </ol>

                        <div className="host-card">
                            {renderHost()}
                        </div>
                    </div>
                </div>
            </div>
        </DocumentTitle>
    )
}

