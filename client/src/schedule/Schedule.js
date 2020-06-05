import React, { useState, useEffect } from 'react';
import ScheduleInputForm from './ScheduleInputForm';
import Delete from "../Delete";
import moment from "moment";
import ScheduleWeek from './ScheduleWeek';

export default function Schedule() {
    const [showForm, setShowForm] = useState(false)
    const [checkedIDs, setCheckedIDs] = useState([]);

    const [scheduleData, setScheduleData] = useState([]);
    const [weekNum, setWeekNum] = useState([])
    let weeklySchedule = [];

    useEffect(() => {
        fetch("http://localhost:3000/schedule")
            .then(res => res.json())
            //sorts the incoming data by date
            // .then(data => setScheduleData(data))
            .then(data => setScheduleData(data.schedule.sort((fromA, fromB)=>new Date(fromA.from) - new Date(fromB.from))))
        }, [])


    ///////////////////////////////
    //split up schedule into weeks
    ///////////////////////////////
    //Find out Week Numbers
    scheduleData.map(el => {
        const num = moment(el.from).format("w")  
        return weekNum.includes(num) ? null : setWeekNum([num, ...weekNum])
    })

    
    weekNum.map(weekNum =>{
        //filter inputData by week number and add array to weeklySchedule
        const week = scheduleData.filter(data => moment(data.from).format("w") === weekNum);
        weeklySchedule = [week, ...weeklySchedule]
        
    })


    const renderLi = (scheduleData) => {
        if (scheduleData.status === 404) return (<h2>Error 404, something went wrong</h2>)
        if (scheduleData.length === 0) return null; //Because first time the code is running, scheduleData will be an empty array
        

        return weeklySchedule.reverse().map((el, i) => (
            <ul key={i} className="weekly-schedule">
            <ScheduleWeek data={el}/>
            </ul>
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
            <div className="schedule-content">
                <h2>schedule</h2>
                <div className="button-container archive-controls">
                    {showForm ? 
                    <button type="button" onClick={() => handleAdd(false)}>cancel</button>:
                    <button type="button" onClick={() => handleAdd(true)}>add schedule</button> 
                    }
                    <button type="button" onClick={() => handleDelete(checkedIDs)}>delete checked</button>
                </div>
                {showForm ? <ScheduleInputForm /> : null} 
                <ul className="monthly-schedule">
                    {renderLi(scheduleData)}
                </ul>
            </div>
        </div>
    )
}
