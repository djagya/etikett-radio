import React, { useState, useEffect, useContext } from 'react'
import {Context} from "../Context";
import {Redirect, Link} from 'react-router-dom';
import GetData from "../GetData";



export default function AllHosts() {
    const context = useContext(Context);
    const [hostData, setHostData] = useState([]);
    let sortedData = [];
    useEffect(() => {
        GetData("http://localhost:3000/host")
            .then(data => setHostData(data.host))
    }, [])

    if (hostData.length !== 0) sortedData = hostData.sort((hostA, hostB)=>(hostA.hostName < hostB.hostName)? -1 : 1)

    const renderHosts = () => {
        if (sortedData.lenght === 0) return null
        return sortedData.map((host, i) => (
            <ol key={i} className="all-data host-list-grid">
                <li>{host.hostName}</li>
                <li>{host.isActive}</li>
                <li>Link To Edit</li>

            </ol>
        ))
    }

    if (!context.allHosts) {return <Redirect to={`/user/${context.id}`}/>}
    return (
        <div className="not-stream-component all-list">
            <h2>all hosts</h2>
            <div className="list-container">
                <div className="button-container">
                    <button type="button" onClick={() => context.setAllHosts(false)}>back</button>
                </div>
                <div>
                    <ul className="list-header host-list-grid">
                        <li>host name</li>
                        <li>is active</li>
                        {/* <li>edit</li> */}
                    </ul>
                {renderHosts()}
                </div>
            </div>
        </div>
    )
}
