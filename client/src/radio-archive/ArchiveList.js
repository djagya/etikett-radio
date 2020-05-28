import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MusicInputForm from "./ArchiveInputForm"
import Delete from "../Delete"

export default function ArchiveList() {

    const [checkedIDs, setCheckedIDs] = useState([]);
    const [archiveData, setArchiveData] = useState([]);
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        fetch("http://localhost:3000/archive")
            .then(res => res.json())
            .then(data => setArchiveData(data.archive))
    }, [])
    //list item construction
    const renderLi = (archiveData) => {
        if (archiveData.status === 404) return (<h2>Error 404, something went wrong</h2>)
        if (archiveData.length === 0) return null; //Because first time the code is running, archiveData will be an empty array
        return archiveData.map((el, i) => (


            <li key={i}>
                <ul className="archive-list">
                    <li><Link to={`archive/${el._id}`}>{el.show}</Link></li>
                    <li>{el.host}</li>
                    <li>{el.genre}</li>
                    <li>{el.date.substring(0, 10)}</li>
                    <li><input className="check-delete" name={el._id} type="checkbox" onChange={handleIDs}></input></li>
                </ul>
            </li>
        ));
    };
    //Add ID's to array which will get passed to DeleteArchive by the Delete Checked button
    const handleIDs = (event) => {
        const checked = event.target.checked
        const id = event.target.name
        if (checked) {
            setCheckedIDs([...checkedIDs, id])
        }
        if (!checked) {
            const filteredIDs = checkedIDs.filter(el => el !== id);
            setCheckedIDs(filteredIDs)
        }
    };

    const handleAdd = boolean => {
        setShowForm(boolean)
    };
    //Delete the deleted Item from archiveData to make it disappear without refreshing the page
    const handleDelete = (checkedIDs) => {
        //prevent error when nothing is selected
        if (checkedIDs.length === 0) {
            return
        }

        //filter copy of archive data based on checkedID and set the new state

        let filteredArchiveData = [...archiveData];
        for (let i = 0; i < checkedIDs.length; i++) {
            filteredArchiveData = filteredArchiveData.filter(el => el._id !== checkedIDs[i]);
        }
        setArchiveData(filteredArchiveData)
        //delete from db
        Delete(checkedIDs, "archive")

        //reset Array of checkedID's
        setCheckedIDs([]);
    }

    return (
        <div className="archive-list-page">
            <div>
                <h2>archive</h2>
                <div className="archive-menu">
                {showForm ? 
                <button type="button" onClick={() => handleAdd(false)}>cancel</button>:
                <button type="button" onClick={() => handleAdd(true)}>add to archive</button> 
                }
                </div>
                {showForm ? <MusicInputForm /> : null}
                <ul className="list-header">
                    <li><h3>show</h3></li>
                    <li><h3>host</h3></li>
                    <li><h3>genre</h3></li>
                    <li><h3>date</h3></li>
                </ul>
                <ul>
                    {renderLi(archiveData)}
                </ul>
                <div className="delete-btn">
                    <button type="button" onClick={() => handleDelete(checkedIDs)}>delete checked</button>
                </div>
            </div>
        </div>

    )
};
