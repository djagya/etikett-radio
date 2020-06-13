import React, { useState, useEffect } from "react";
import GetData from "../GetData";

import DocumentTitle from 'react-document-title';

import HostShowcase from "./HostShowcase";


export default function Hosts() {
    const [hostData, setHostData] = useState([])
    let sortedData = []
    console.log(hostData)
    useEffect(() => {
      GetData("http://localhost:3000/host")
        .then(data => setHostData(data.host))
    }, [])

    if (hostData.length !== 0) sortedData = hostData.sort((hostA, hostB)=>(hostA.hostName < hostB.hostName)? -1 : 1)


    const renderLabels = (host, i) => {
        const num = i+1;

        return (
            <li key={i} className="control-container">
            <label htmlFor={`carousel-${num === 1 ? sortedData.length : num -1}`} className={`carousel-control prev control-${num}`}>‹</label>
            <label htmlFor={`carousel-${num === sortedData.length ? 1 : num +1}`} className={`carousel-control prev control-${num}`}>›</label>
            </li>
        )
    }


    const renderIndicator = (host, i) => (
        <li key={i}>
            <label htmlFor={`carousel-${i+1}`} className="carousel-bullet">{host.hostName}</label>
        </li>
    )

  return (
    <DocumentTitle title="Hosts page">
    <div className="not-stream-component host-carousel">
    <h2>hosts</h2>
        <div className="carousel">
            <div className="carousel-inner">
                <HostShowcase hosts={sortedData} />
                <ol>
                {sortedData.map((host, i) => renderLabels(host, i))}
                </ol>
                <ol className="carousel-indicators">
                {sortedData.map((host, i) => renderIndicator(host, i))}
                </ol>
                
            </div>

        </div>
    </div>
    </DocumentTitle>
  )
}

