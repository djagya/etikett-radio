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
    }, [param])

    return (
        <Context.Provider value={{showEdit,setShowEdit}}>
        <div className="archive-details-page not-stream-component">
        
            <div className="button-container controls">
                {showEdit ? 
                <button type="button" onClick={() => setShowEdit(false)}>cancel</button>:
                <button type="button" onClick={() => setShowEdit(true)}>edit</button> 
                }
            </div>
            {showEdit ?
                <ArchiveEdit id={param} data={archiveData} /> :
            <div className="archive-details">
                <Link to={`/archive`}>back to archive</Link>
                <div>
                    <img src={archiveData.img} alt="Artwork of the show" />
                    <div className="list">
                        <h2>{archiveData.show} by {archiveData.host}</h2>
                        <p>{archiveData.length === 0 ? null : archiveData.date.substring(0, 10)}</p>
                        {archiveData.genre}
                        <q>{archiveData.description}</q>
                        <a target="_blank" rel="noopener noreferrer" href={archiveData.link}>listen back </a>
                    </div>
                </div>
            </div>
            }
        </div>
        </Context.Provider>
    )
}
