import React from 'react'

export default function HostShowcase(props) {
const hosts = props.hosts
    if (hosts.length === 0 ) return null
    console.log(hosts)

    const renderHost = (host, i) => (
        <li key={i}>
        <input className="carousel-open" type="radio" id={`carousel-${i+1}`} name="carousel" 
        aria-hidden="true" hidden defaultChecked={i+1===1 ? true : false} />
        
        <div className="carousel-item">
            <img src={host.hostImg} alt={`Artwork or photo of ${host.hostName}`} />
        </div>
        </li>
    )

    return (
        <div>
            <ol>
            {hosts.map((host, i) => renderHost(host, i))}
            </ol>
        </div>
    )
}
