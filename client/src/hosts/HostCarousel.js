import React, { useState, useEffect } from "react";
import GetData from "../GetData";

import DocumentTitle from 'react-document-title';

import Img1 from "./jerome-prax-jLZWzT_kdTI-unsplash.jpg";
import Img2 from "./kensuke-saito-surf-photography-rXsnA-67Chs-unsplash.jpg";
import Img3 from "./vignesh-kumar-r-b-FrZo1GNZ2go-unsplash.jpg";
// Render div


export default function Hosts() {
const [hostData, setHostData] = useState([])

  
    useEffect(() => {
      GetData("http://localhost:3000/host")
        .then(data => setHostData(data.host))
    }, [])

    console.log(hostData)

    // const renderContent {
    //     host
    // }

  return (
    <DocumentTitle title="Hosts page">
    <div className="not-stream-component host-carousel">
    <h2>hosts</h2>
        <div className="carousel">
            <div className="carousel-inner">
                <input className="carousel-open" type="radio" id="carousel-1" name="carousel" aria-hidden="true" hidden/>
                <div className="carousel-item">
                    <img src={Img1}/>
                </div>
                <input className="carousel-open" type="radio" id="carousel-2" name="carousel" aria-hidden="true" hidden defaultChecked="checked"/>
                <div className="carousel-item">
                    <img src={Img2}/>
                </div>
                <input className="carousel-open" type="radio" id="carousel-3" name="carousel" aria-hidden="true" hidden/>
                <div className="carousel-item">
                    <img src={Img3}/>
                </div>
                <label htmlFor="carousel-3" className="carousel-control prev control-1">‹</label>
                <label htmlFor="carousel-2" className="carousel-control next control-1">›</label>
                <label htmlFor="carousel-1" className="carousel-control prev control-2">‹</label>
                <label htmlFor="carousel-3" className="carousel-control next control-2">›</label>
                <label htmlFor="carousel-2" className="carousel-control prev control-3">‹</label>
                <label htmlFor="carousel-1" className="carousel-control next control-3">›</label>
                <ol className="carousel-indicators">
                    <li>
                        <label htmlFor="carousel-1" className="carousel-bullet">img1</label>
                    </li>
                    <li>
                        <label htmlFor="carousel-2" className="carousel-bullet">img2</label>
                    </li>
                    <li>
                        <label htmlFor="carousel-3" className="carousel-bullet">img3</label>
                    </li>
                </ol>
            </div>
        </div>
    </div>
    </DocumentTitle>
  )
}

