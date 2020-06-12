import React, { useState, useEffect } from "react";
import EmblaCarouselComponent from "./EmblaCarouselComponent";
import GetData from "../GetData";

import DocumentTitle from 'react-document-title';


export default function Hosts() {
  const [hostData, setHostData] = useState([])

  const renderHosts = hostData.map(host => { return <div /> })

  useEffect(() => {
    GetData("http://localhost:3000/host")
      .then(data => setHostData(data.host))
  }, [])
  console.log(renderHosts)

  return (
    <DocumentTitle title="Hosts page">
      <div className="not-stream-component hosts">
        <h2>hosts</h2>
        <EmblaCarouselComponent>

          {/* {renderHosts} */}
          <div />
          <div />
        </EmblaCarouselComponent>
      </div>
    </DocumentTitle>

  )
}



