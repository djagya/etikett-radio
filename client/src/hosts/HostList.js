import React, { useState, useEffect, useContext, Fragment } from 'react'
import { Context } from "../Context";
import GetData from "../GetData";
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Null from '../loading/Null';

export default function HostList() {
    const context = useContext(Context);
    const [hostData, setHostData] = useState([]);
    const [loading, setLoading] = useState(false);
    const alert = useAlert();

    useEffect(() => {
        setLoading(true);
        GetData("/host")
            .then(data => {
                setHostData(data.host.filter(host => host.isActive === "active").sort((hostA, hostB) => (hostA.hostName < hostB.hostName) ? -1 : 1))
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                alert.error('Failed to fetch hosts from the server. Please contact the admin.');
            })
    }, [alert])

    const renderHost = () => {
        if (hostData.length === 0) return null

        return hostData.map((host, i) => (
            <Fragment key={i}>
                <li className="hosts-list-item">
                    <Link className="link-component" to={`hosts/${host._id}`} param={host._id} >
                    
                        <div className="host-image-borders">
                            <h3 className="host-name">{host.hostName}.</h3>
                            <img src={host.hostImg} alt={`Artwork or portrait of ${host.hostName}`} className="host-images" width="400px" height="400px" />
                        </div>
                    </Link>
                </li>
            </Fragment>
        ))
    }

    if (loading) return <Null />

    return (
        <DocumentTitle title="Hosts">
            <div className={`${context.gapClass} host-list-component`}>
                <h1 id="hosts-title">hosts.</h1>
                <div className="grid-wrapper">
                    <div className=" hosts-list">
                        {renderHost()}
                    </div>
                </div>
            </div>
        </DocumentTitle>
    )
}
