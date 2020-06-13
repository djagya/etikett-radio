import React, { useState, useEffect } from "react";
import GetData from "../GetData";

import DocumentTitle from 'react-document-title';

import HostShowcase from "./HostShowcase";


export default function Hosts() {
    const [hostData, setHostData] = useState([])
    let filteredData = []
    let sortedData = []

    // let [leftNum, setLeftNum] = useState(0)
    let [num, setNum]  = useState(0)
    // let [rightNum, setRightNum] = useState(2)
    useEffect(() => {
      GetData("http://localhost:3000/host")
        .then(data => setHostData(data.host))
    }, [])

    //filter out active hosts
    if (hostData.length !== 0) {
        filteredData = hostData.filter(host => host.isActive === "active" ) 
    }
    //sort active members by hostName
    if (filteredData.length !== 0) {
        sortedData = filteredData.sort((hostA, hostB)=>(hostA.hostName < hostB.hostName)? -1 : 1) 
    }


    const renderHost = () => {
        if (sortedData.length === 0) return null


        return (
        <div>
            <input className="carousel-open" type="radio" id={`carousel-${num}`} name="carousel" 
            aria-hidden="true" hidden defaultChecked={true} />
            
            <div className="carousel-item">
                <img src={sortedData[num].hostImg} alt={`Artwork or photo of ${sortedData[num].hostName}`} />
            </div>
        </div> 
        )
    }
 
    // const handleControls = action => {

    //     if (action === "right") {
    //         console.log("preCalc ", num)
    //     setNum(num++)
    //     console.log("postCalc", num)
    //         }

    //     if (action === "left") {
    //     setNum(num--)
    //     }
    // }
    const renderIndicator = (host, i) => (
        <li key={i}>
            <label htmlFor={`carousel-${i+1}`} onClick={()=>setNum(i)} className={`carousel-hostname`}>
                {host.hostName}
            </label>
        </li>
    )

  return (
    <DocumentTitle title="Hosts page">
    <div className="not-stream-component host-showcase">
    <h2>hosts</h2>
        <div className="carousel">
        <ol className="carousel-indicators">
                {sortedData.map((host, i) => renderIndicator(host, i))}
                </ol>
            <div className="carousel-inner">
                {renderHost()}

                {/* <div className="control-container">
                <label htmlFor={`carousel-${leftNum}`} onClick={() => handleControls("left") } className={`carousel-control prev control-${num}`}>‹</label>
                <label htmlFor={`carousel-${rightNum}`} onClick={() => handleControls("right")} className={`carousel-control next control-${num}`}>›</label>
                </div> */}

                
                
            </div>

        </div>
    </div>
    </DocumentTitle>
  )
}

