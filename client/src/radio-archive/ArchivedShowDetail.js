import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function ArchiveDetail(props) {
    const [archiveData, setArchiveData] = useState([]);
    const param = props.match.params.id

    useEffect(() => {
        fetch(`http://localhost:3000/archive/${param}`)
            .then(res => res.json())
            .then(data => setArchiveData(data.archive))
    }, [])

    const renderLi = (archiveData) => {
        if (archiveData.status === 404) return (<h2>Error 404, something went wrong</h2>)
        if (archiveData.length === 0) return null;
        return (
            <ul className="list-right">
                <li>{archiveData.show}</li>
                <li>{archiveData.host}</li>
                <li>{archiveData.date.substring(0, 10)}</li>
            </ul>
        )

    };



    return (
        <div className="archive-details-page">
            <h2>{archiveData.title} by {archiveData.artist}</h2>
            <div className="archive-details">
                <ul>
                    <li>Show: </li>
                    <li>Host: </li>
                    <li>Was live at: </li>
                </ul>
                {renderLi(archiveData)}
            </div>
            <a target="_blank" href={archiveData.link}>listen back </a>
            <img src={archiveData.img} alt="Show Image Here" />
            <Link to={`/${param}/edit`}>edit</Link>
            <Link to={`/archive`}>back to archive</Link>
        </div>
    )
}
