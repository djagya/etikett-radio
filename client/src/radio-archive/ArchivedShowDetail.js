import React, { useState, useEffect, useContext } from 'react'
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import { Context } from "../Context";
import ArchiveInputForm from './ArchiveInputForm';
import DocumentTitle from 'react-document-title';

export default function ArchiveDetail(props) {
    const context = useContext(Context)
    const [showEdit, setShowEdit] = useState(false);
    const [archiveData, setArchiveData] = useState([]);
    const param = props.match.params.id;
    const alert = useAlert();

    useEffect(() => {

        fetch(`/archive/${param}`)
            .then(res => res.json())
            .then(data => setArchiveData(data.archive))
            .catch(err => {
                console.log('Error fetching data: ', err);
                alert.error("Failed to fetch data, please contact the admin.");
            })
    }, [param])
    return (
        <DocumentTitle title={`Archive | ${archiveData.show}`}>
            <Context.Provider value={{
                showEdit, setShowEdit,
                archiveData, setArchiveData
            }}>
                <div className={`${context.gapClass} archive-details-page`}>
                    <div className="archive-details-content">
                        <div className="button-container controls">
                            {showEdit ?
                                <button type="button" onClick={() => setShowEdit(false)}>cancel</button> :
                                <button type="button" onClick={() => setShowEdit(true)}>edit</button>
                            }
                        </div>
                        {showEdit ?
                            <ArchiveInputForm id={param} data={archiveData} /> :
                            <div className="archive-details">
                                <Link className="link-component" to={`/archive`}>back to archive</Link>
                                <div className="archive-details-card">
                                    <img src={archiveData.img} width="300" height="300" alt={`Artwork of ${archiveData.show}`} />
                                    <div className="list">
                                        <h2>{archiveData.show} by {archiveData.host}</h2>
                                        <p>{archiveData.length === 0 ? null : archiveData.date.substring(0, 10)}</p>
                                        <p>{archiveData.genre}</p>
                                        <a className="link-component" target="_blank" rel="noopener noreferrer" href={archiveData.link}>listen back </a>
                                        <q>{archiveData.description}</q>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </Context.Provider>
        </DocumentTitle>
    )
}
