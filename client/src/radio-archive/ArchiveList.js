import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../Context";
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import ArchiveInputForm from "./ArchiveInputForm";
import Delete from "../Delete";

import DocumentTitle from 'react-document-title';


export default function ArchiveList(props) {
    const context = useContext(Context)

    const [checkedIDs, setCheckedIDs] = useState([]);
    const [archiveData, setArchiveData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isActive, setIsActive] = useState(3);
    const [lastSort, setLastSort] = useState(3)
    const alert = useAlert();

    useEffect(() => {
        fetch("/archive")
            .then(res => res.json())
            .then(data => setArchiveData(data.archive.sort((showA, showB) => (showA.date > showB.date) ? -1 : 1)))
    }, [])

    const sortData = i => {
        switch (i) {
            case 0:
                setIsActive(0)
                if (lastSort !== isActive) {
                    setArchiveData([...archiveData].sort((showA, showB) => (showA.show > showB.show) ? -1 : 1))
                    setLastSort(0)
                } else {
                    setArchiveData([...archiveData].sort((showA, showB) => (showA.show < showB.show) ? -1 : 1))
                    setLastSort(-1)
                }
                break;
            case 1:
                setIsActive(1)
                if (lastSort !== isActive) {
                    setArchiveData([...archiveData].sort((showA, showB) => (showA.host > showB.host) ? -1 : 1))
                    setLastSort(1)
                } else {
                    setArchiveData([...archiveData].sort((showA, showB) => (showA.host < showB.host) ? -1 : 1))
                    setLastSort(-1)
                }
                break;
            case 2:
                setIsActive(2)
                if (lastSort !== isActive) {
                    setArchiveData([...archiveData].sort((showA, showB) => (showA.genre > showB.genre) ? -1 : 1))
                    setLastSort(2)
                } else {
                    setArchiveData([...archiveData].sort((showA, showB) => (showA.genre < showB.genre) ? -1 : 1))
                    setLastSort(-1)
                }
                break;
            case 3:
                setIsActive(3)
                if (lastSort !== isActive) {
                    setArchiveData([...archiveData].sort((showA, showB) => (showA.date > showB.date) ? -1 : 1))
                    setLastSort(3)
                } else {
                    setArchiveData([...archiveData].sort((showA, showB) => (showA.date < showB.date) ? -1 : 1))
                    setLastSort(-1)
                }
                break;
            default: console.log("Sort Switch ran without any effect")
        }
    }




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
        Delete(checkedIDs, "archive").then(output => {
            output ? alert.success('Item(s) successfully deleted.', { timeout: 3000 }) : alert.error('Something went wrong...');
        })

    }
    //list item construction
    const renderLi = (archiveData) => {
        if (archiveData.status === 404) return (<h2>Error 404, something went wrong</h2>)
        if (archiveData.length === 0) return null; //Because first time the code is running, archiveData will be an empty array
        return archiveData.map((el, i) => (


            <li key={i}>

                <ul className="all-data archive-list-grid">
                    <li className="img-container"><img src={el.img} alt={`Small version of the artwork of ${el.show}`} width="50" height="50" /></li>
                    <li><Link className="link-component" to={`archive/${el._id}`}>{el.show}</Link></li>
                    <li><Link className="link-component" to={`hosts/${el.hostID}`}>{el.host}</Link></li>
                    <li>{el.genre}</li>
                    <li>{el.date.substring(0, 10)}</li>
                    {props.cookies.user && props.cookies.user.role === 'Admin' ?
                        <li><input className="check-delete" name={el._id} type="checkbox" onChange={handleIDs}></input></li>
                        : null}
                </ul>
            </li>
        ));
    };

    const renderLiHeader = () => {
        const listHeader = ["show.", "host.", "genre.", "date."]

        return listHeader.map((el, i) => (
            <li key={i} ><span onClick={() => sortData(i)} className={`sort ${i === isActive ? "active" : ""} `}>{el}</span></li>

        ))
    }

    return (
        <DocumentTitle title="Archive">
            <div className={`${context.gapClass} all-list`}>
                <div>
                    <h2 id="main">archive.</h2>

                    {props.cookies.user && props.cookies.user.role === 'Admin' ?
                        <div className="button-container controls archive-add-delete-buttons">
                            {showForm ?
                                <button type="button" onClick={() => setShowForm(false)}>cancel</button> :
                                <button type="button" onClick={() => setShowForm(true)}>add to archive</button>
                            }
                            <button type="button" onClick={() => handleDelete(checkedIDs)}>delete checked</button>
                        </div>
                        : null}

                    {showForm ? <ArchiveInputForm /> : null}
                    <ul className="list-header archive-list-grid sort-by-box">
                        {/* <li></li> Placeholder item for show artwork */}
                        <li>sort by:</li>
                        {renderLiHeader()}
                    </ul>
                    <ul>
                        {renderLi(archiveData)}
                    </ul>
                </div>
            </div>
        </DocumentTitle>
    )
};
