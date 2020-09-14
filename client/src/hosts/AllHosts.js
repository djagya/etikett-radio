import React, { useState, useEffect, useContext, Fragment } from 'react'
import { useAlert } from 'react-alert';
import { Context } from "../Context";
import { Link, Redirect } from 'react-router-dom';
import GetData from "../GetData";
import DocumentTitle from 'react-document-title';



export default function AllHosts(props) {
    const context = useContext(Context);
    const [hostData, setHostData] = useState([]);
    const alert = useAlert();

    const [isActive, setIsActive] = useState(0);
    const [lastSort, setLastSort] = useState(0)
    useEffect(() => {
        GetData("/host")
            .then(data => {
                if (data.status === 403) {
                    alert.error("Status 403: Forbidden")
                    return
                }
                if (data.success) {
                    setHostData(data.host.sort((hostA, hostB) => (hostA.hostName < hostB.hostName) ? -1 : 1))
                } else {
                    alert.error("Something went wrong")
                }
            })
    }, [alert])


    const sortData = i => {
        switch (i) {
            case 0:
                setIsActive(0)
                if (lastSort !== isActive) {
                    setHostData([...hostData].sort((hostA, hostB) => (hostA.hostName < hostB.hostName) ? -1 : 1))
                    setLastSort(0)
                } else {
                    setHostData([...hostData].sort((hostA, hostB) => (hostA.hostName > hostB.hostName) ? -1 : 1))
                    setLastSort(-1)
                }
                break;
            case 1:
                setIsActive(1)
                if (lastSort !== isActive) {
                    setHostData([...hostData].sort((hostA, hostB) => (hostA.isActive < hostB.isActive) ? -1 : 1))
                    setLastSort(1)
                } else {
                    setHostData([...hostData].sort((hostA, hostB) => (hostA.isActive > hostB.isActive) ? -1 : 1))
                    setLastSort(-1)
                }
                break;
            default: console.log("Sort Switch ran without any effect")
        }

    }

    const renderHosts = () => {
        if (hostData.length === 0) return null
        return hostData.map((host, i) => (
            <Fragment key={i}>
                <ol className="all-data host-list-grid">
                    <li>{host.hostName}</li>
                    <li>{host.isActive}</li>
                    <li className="button-container">

                        <Link className="link-button" to={`/user/host/${context.id}`}>
                            <button type="button" onClick={() => context.setEditHostID(host.userID)}>
                            edit
                            </button>
                        </Link>


                    </li>
                </ol>
            </Fragment>
        ))
    }

    const renderLiHeader = () => {
        const listHeader = ["host.", "status."]

        return listHeader.map((el, i) => (
            <Fragment key={i}>
            <li ><span onClick={() => sortData(i)} className={`sort ${i === isActive ? "active" : ""} `}>{el}</span></li>
            </Fragment>
        ))
    }

    if (props.cookies.user.role !== 'Admin') {
        return  <Redirect to={`/user/${context.id}`}/>
    }

    return (
        <DocumentTitle title="All Hosts">
            <div className={` all-list ${context.gapClass}`}>
                <h1 id="main">all hosts.</h1>
                <div className="list-container">
                    <Link className="button-container" test="vong all hosts her" to={`/user/${context.id}`}><button type="button">back</button></Link>
                    <div>
                        <ul className="list-header host-list-grid">
                            {renderLiHeader()}
                        </ul>
                        {renderHosts()}
                    </div>
                </div>
            </div>
        </DocumentTitle>
    )
}
