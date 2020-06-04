import React, { useState, useEffect } from 'react';
import ScheduleInputForm from './ScheduleInputForm';
import Delete from "../Delete";

export default function Schedule() {

    const [checkedIDs, setCheckedIDs] = useState([]);
    const [scheduleData, setScheduleData] = useState([]);
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        fetch("http://localhost:3000/schedule")
            .then(res => res.json())
            //sorts the incoming data by date
            .then(data => setScheduleData(data.schedule.sort((fromA, fromB)=>new Date(fromA.from) - new Date(fromB.from))))
    }, [])
    //list item construction
    const renderLi = (scheduleData) => {
        if (scheduleData.status === 404) return (<h2>Error 404, something went wrong</h2>)
        if (scheduleData.length === 0) return null; //Because first time the code is running, scheduleData will be an empty array
        return scheduleData.map((el, i) => (


            <li key={i}>
                <ul className="schedule-list">
                    <li>{el.show}</li>
                    <li>{el.from}</li>
                    <li>{el.to}</li>
                    <li><input className="check-delete" name={el._id} type="checkbox" onChange={handleIDs}></input></li>
                </ul>
            </li>
        ));
    };

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
    const handleDelete = (checkedIDs) => {
        //prevent error when nothing is selected
        if (checkedIDs.length === 0) {
            return
        }

        //filter copy of schedule data based on checkedID and set the new state

        let filteredScheduleData = [...scheduleData];
        for (let i = 0; i < checkedIDs.length; i++) {
            filteredScheduleData = filteredScheduleData.filter(el => el._id !== checkedIDs[i]);
        }
        setScheduleData(filteredScheduleData)
        //delete from db
        Delete(checkedIDs, "schedule")

        //reset Array of checkedID's
        setCheckedIDs([]);
    }
    return (
        <div className="schedule-page not-stream-component">
            <h2>schedule</h2>
            <div className="button-container archive-controls">
                {showForm ? 
                <button type="button" onClick={() => handleAdd(false)}>cancel</button>:
                <button type="button" onClick={() => handleAdd(true)}>add to archive</button> 
                }
                <button type="button" onClick={() => handleDelete(checkedIDs)}>delete checked</button>
            </div>
            {showForm ? <ScheduleInputForm /> : null}
            <ul>
                {renderLi(scheduleData)}
            </ul>
        </div>
    )
}
