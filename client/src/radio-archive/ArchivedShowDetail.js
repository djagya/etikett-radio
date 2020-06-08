import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import ArchiveEdit from './ArchiveEditForm';
import {Context} from "../Context";

export default function ArchiveDetail(props) {
    const [showEdit, setShowEdit] =useState(false);
    const [archiveData, setArchiveData] = useState([]);
    const param = props.match.params.id
    useEffect(() => {
        fetch(`http://localhost:3000/archive/${param}`)
            .then(res => res.json())
            .then(data => setArchiveData(data.archive))
    })

    const renderLi = (archiveData) => {
        if (archiveData.status === 404) return (<h2>Error 404, something went wrong</h2>)
        if (archiveData.length === 0) return null;
        return (
            <ul className="list-right">
                <li>{archiveData.genre}</li>
                <li>{archiveData.date.substring(0, 10)}</li>
            </ul>
        )

    };

    return (
        <Context.Provider value={{showEdit,setShowEdit}}>
        <div className="archive-details-page not-stream-component">
        
            <div className="button-container archive-controls">
                {showEdit ? 
                <button type="button" onClick={() => setShowEdit(false)}>cancel</button>:
                <button type="button" onClick={() => setShowEdit(true)}>edit</button> 
                }
            </div>
            {showEdit ?
                <ArchiveEdit id={param} data={archiveData} /> :
            <div>
                <Link to={`/archive`}>back to archive</Link>
                <h2>{archiveData.show} by {archiveData.host}</h2>
                <q>{archiveData.description}</q>
                <div className="archive-details">
                    <ul>
                        <li>genre: </li>
                        <li>was live at: </li>
                    </ul>
                    {renderLi(archiveData)}
                </div>
                <a target="_blank" rel="noopener noreferrer" href={archiveData.link}>listen back </a>
                <img src={archiveData.img} alt="Artwork of the show" />
            </div>}
        </div>
        </Context.Provider>
    )
}
