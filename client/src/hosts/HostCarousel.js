import React, { useState, useEffect } from "react";
import GetData from "../GetData";

import DocumentTitle from 'react-document-title';

import Img1 from "./jerome-prax-jLZWzT_kdTI-unsplash.jpg";
import Img2 from "./kensuke-saito-surf-photography-rXsnA-67Chs-unsplash.jpg";
import Img3 from "./vignesh-kumar-r-b-FrZo1GNZ2go-unsplash.jpg";
// Render div


export default function Hosts() {



    const [hostData, setHostData] = useState([])

    const renderHosts = hostData.map(host => { return <div /> })
  
    useEffect(() => {
      GetData("http://localhost:3000/host")
        .then(data => setHostData(data.host))
    }, [])

  return (
    <DocumentTitle title="Hosts page">
    <div class="carousel">
        <div class="carousel-inner">
            <input class="carousel-open" type="radio" id="carousel-1" name="carousel" aria-hidden="true" hidden=""
                checked="checked"/>
            <div class="carousel-item">
                <img src={Img1}/>
            </div>
            <input class="carousel-open" type="radio" id="carousel-2" name="carousel" aria-hidden="true" hidden=""/>
            <div class="carousel-item">
                <img src={Img2}/>
            </div>
            <input class="carousel-open" type="radio" id="carousel-3" name="carousel" aria-hidden="true" hidden=""/>
            <div class="carousel-item">
                <img src={Img3}/>
            </div>
            <label for="carousel-3" class="carousel-control prev control-1">‹</label>
            <label for="carousel-2" class="carousel-control next control-1">›</label>
            <label for="carousel-1" class="carousel-control prev control-2">‹</label>
            <label for="carousel-3" class="carousel-control next control-2">›</label>
            <label for="carousel-2" class="carousel-control prev control-3">‹</label>
            <label for="carousel-1" class="carousel-control next control-3">›</label>
            <ol class="carousel-indicators">
                <li>
                    <label for="carousel-1" class="carousel-bullet">Test</label>
                </li>
                <li>
                    <label for="carousel-2" class="carousel-bullet">•</label>
                </li>
                <li>
                    <label for="carousel-3" class="carousel-bullet">•</label>
                </li>
            </ol>
        </div>
    </div>
    </DocumentTitle>
  )
}

