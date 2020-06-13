import React, { useState, useEffect } from "react";
import GetData from "../GetData";

import DocumentTitle from 'react-document-title';

import HostShowcase from "./HostShowcase";


export default function Hosts() {
    const [hostData, setHostData] = useState([])
    let [num, setNum] = useState(1)
    let sortedData = []
    console.log(hostData)
    useEffect(() => {
      GetData("http://localhost:3000/host")
        .then(data => setHostData(data.host))
    }, [])

    if (hostData.length !== 0) sortedData = hostData.sort((hostA, hostB)=>(hostA.hostName < hostB.hostName)? -1 : 1)


    // const renderLabels = (host, i) => {
 

    //     return (
    //         <li key={i} className="control-container">
    //         <label htmlFor={`carousel-${num === 1 ? setNum(sortedData.length) : setNum(num -1)}`} className={`carousel-control prev control-${num}`}>‹</label>
    //         <label htmlFor={`carousel-${num === setNum(sortedData.length) ? setNum(1) : setNum(num +1)}`} className={`carousel-control prev control-${num}`}>›</label>
    //         </li>
    //     )
    // }
console.log(num)

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
                {/* <ol>
                {sortedData.map((host, i) => renderLabels(host, i))}
                </ol> */}
                <li className="control-container">
                <label htmlFor={`carousel-${num === 1 ? sortedData.length : (num +1)}`} onClick={() => setNum(num++)} className={`carousel-control prev control-${num}`}>‹</label>
                <label htmlFor={`carousel-${num === sortedData.length ? 1 : (num -1)}`} onClick={() => setNum(num--)} className={`carousel-control prev control-${num}`}>›</label>
                </li>
                <ol className="carousel-indicators">
                {sortedData.map((host, i) => renderIndicator(host, i))}
                </ol>
                
            </div>

        </div>
    </div>
    </DocumentTitle>
  )
}

