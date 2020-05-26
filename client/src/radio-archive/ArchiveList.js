import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Delete from "../Delete"

export default function ArchiveList() {

    const [checkedIDs, setCheckedIDs] = useState([]);
    const [archiveData, setArchiveData] = useState([]);

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
                    <li><Link to={`archive/${el._id}`}>{el.title}</Link></li>
                    <li>{el.host}</li>
                    <li>{el.show}</li>
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
    }

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
        Delete(checkedIDs)

        //reset Array of checkedID's
        setCheckedIDs([]);
    }
    console.log("test");

    return (
        <div className="archive-list-page">
            <div>
                <h2>Archive</h2>
                <div className="archive-menu">
                    <Link to="/archive/post"> Add New Track </Link>
                </div>
                <ul className="list-header">
                    <li><h3>Host</h3></li>
                    <li><h3>Show</h3></li>
                    <li><h3>Genre</h3></li>
                    <li><h3>Date</h3></li>
                </ul>
                <ul>
                    {renderLi(archiveData)}
                </ul>
                <div className="delete-btn">
                    <button type="button" onClick={() => handleDelete(checkedIDs)}>Delete Checked</button>
                </div>
            </div>
        </div>

    )
};
