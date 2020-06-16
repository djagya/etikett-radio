import React, { useState, useEffect, useContext } from 'react'
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import ArchiveEdit from './ArchiveEditForm';
import {Context} from "../Context";

export default function ArchiveDetail(props) {
    const context = useContext(Context)
    const [showEdit, setShowEdit] =useState(false);
    const [archiveData, setArchiveData] = useState([]);
    const param = props.match.params.id;
    const alert = useAlert();

    useEffect(() => {

        fetch(`http://localhost:3000/archive/${param}`)
            .then(res => res.json())
            .then(data => setArchiveData(data.archive))
            .catch(err => {
                console.log('Error fetching data: ', err);
                alert.error("Failed to fetch data, please contact an admin.");
            })
    }, [param])

    return (
        <Context.Provider value={{showEdit,setShowEdit}}>
        <div className={`${context.gapClass} archive-details-page`}>
        
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
                    <img src={archiveData.img} width="300" height="300" alt={`Artwork of ${archiveData.show}`} />
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
