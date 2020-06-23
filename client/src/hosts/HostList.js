import React, { useState, useEffect, useContext } from 'react'
import { Context } from "../Context";
import GetData from "../GetData";
import DocumentTitle from 'react-document-title';

export default function HostList() {
    const context = useContext(Context);
    const [hostData, setHostData] = useState([])

    useEffect(() => {
        GetData("/host")
            .then(data => setHostData(data.host.filter(host => host.isActive)))
    }, [])
    console.log(hostData)
    return (
        <div className={` all-list ${context.gapClass}`}>
            <h2>Host List</h2>
        </div>
    )
}
