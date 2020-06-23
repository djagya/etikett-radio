import React, { useState, useEffect, useContext } from 'react'
import { Context } from "../Context";
import GetData from "../GetData";
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';

export default function HostList() {
    const context = useContext(Context);
    const [hostData, setHostData] = useState([])

    useEffect(() => {
        GetData("/host")
            .then(data => setHostData(data.host.filter(host => host.isActive === "active").sort((hostA, hostB) => (hostA.hostName < hostB.hostName) ? -1 : 1)))
    }, [])

    const renderHost = () => {
        if (hostData.length === 0) return null

        return hostData.map((host, i) =>
            (
                <li key={i} className="hosts-list">
                    <Link to={`hosts/${host._id}`} >
                        <img src={host.hostImg} alt={`Artwork or photo of ${host.hostName}`} className="host-images" width="400px" height="400px" />
                        <h3 className="host-name">{host.hostName}</h3>
                    </Link>
                </li>

            )
        )
    }


    return (
        <DocumentTitle title="Hosts">
            <div className={`${context.gapClass}`}>
                <h2 id="hosts-title">hosts.</h2>
                <div className="grid-wrapper">
                    <div className=" hosts-list">
                        {renderHost()}
                    </div>
                </div>
            </div>
        </DocumentTitle>
    )
}
