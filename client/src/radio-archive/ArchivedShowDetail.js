import React, { useState, useEffect, useContext } from 'react'
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import { Context } from "../Context";
import ArchiveInputForm from './ArchiveInputForm';
import DocumentTitle from 'react-document-title';
import Null from '../loading/Null';

export default function ArchiveDetail(props) {
    const context = useContext(Context)
    const [showEdit, setShowEdit] = useState(false);
    const [archiveData, setArchiveData] = useState([]);
    const param = props.match.params.id;
    const alert = useAlert();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        fetch(`/archive/${param}`)
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                setArchiveData(data.archive)
            })
            .catch(err => {
                setLoading(false);
                alert.error("Failed to fetch data, please contact the admin.");
            })
    }, [param, alert])

    if (loading) return <Null />

    return (
        <DocumentTitle title={`Archive | ${archiveData.show}`}>
            <Context.Provider value={{
                showEdit, setShowEdit,
                archiveData, setArchiveData
            }}>
                <div className={`${context.gapClass} archive-details-page`}>
                    <div className="archive-details-content">
                        <div className="button-container controls">
                            {(props.cookies.user && props.cookies.user.role === ('Admin' || "Host")) ?
                                showEdit ?
                                    <button type="button" onClick={() => setShowEdit(false)}>cancel</button> :
                                    <button type="button" onClick={() => setShowEdit(true)}>edit</button>
                            :null}
                        </div>
                        {showEdit ?
                            <ArchiveInputForm id={param} data={archiveData} /> :
                            <div className="archive-details">
                                <Link className="link-component" to={`/archive`}>back to archive</Link>
                                <div className="archive-details-card">
                                    <div className="archive-header">
                                        <img src={archiveData.img} width="300" height="300" alt={`Artwork of ${archiveData.show}`} />
                                        <div className="header-p-a">
                                            <h1>{archiveData.show} by {archiveData.host}</h1>
                                            <div class="divider"></div>
                                            <a className="link-component" target="_blank" rel="noopener noreferrer" href={archiveData.link}>listen back </a>
                                        </div>
                                    </div>
                                    <div className="description-container">
                                        <div className="meta-data">
                                            <p>{archiveData.length === 0 ? null : archiveData.date.substring(0, 10)}</p>
                                            <p>{archiveData.genre}</p>
                                        </div>
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
