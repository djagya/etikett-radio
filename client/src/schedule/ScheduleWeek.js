import React, { useState, useContext} from 'react';
import moment from "moment";
import {Context} from "../Context";

export default function ScheduleWeek(data) {
    const week = data.data
    const [showEdit, setShowEdit] =useState(false);
    const context = useContext(Context)

    const mon = week.filter(data => moment(data.from).format("dddd") === "Monday");
    const tue = week.filter(data => moment(data.from).format("dddd") === "Tuesday");
    const wed = week.filter(data => moment(data.from).format("dddd") === "Wednesday");
    const thu = week.filter(data => moment(data.from).format("dddd") === "Thursday");
    const fri = week.filter(data => moment(data.from).format("dddd") === "Friday");
    const sat = week.filter(data => moment(data.from).format("dddd") === "Saturday");
    const sun = week.filter(data => moment(data.from).format("dddd") === "Sunday");
  
    // const days =[mon, tue, wed, thu, fri, sat, sun];
    
    const handleIDs = (event) => {
        const checked = event.target.checked
        const id = event.target.name
        if (checked) {
            context.setCheckedIDs([...context.checkedIDs, id])
        }
        if (!checked) {
            const filteredIDs = context.checkedIDs.filter(el => el !== id);
            context.setCheckedIDs(filteredIDs)
        }
    };

    const handleEdit = boolean => {
        setShowEdit(boolean)
    };

    const determineWeek=() => {
        const dataWeek = moment(week[0].from).format("W");
        const currWeek = moment().format("W");
        return dataWeek === currWeek ? "this week" : `week ${dataWeek}`
    }

    const dates = day => day.map((data, i) => {
        ///////For interactivity//////////
        let isLive = "";
        const showStart = moment(data.from);
        const showEnd = moment(data.to);
        const currTime = moment();
        
        if (currTime > showEnd) {
            isLive = "was-live";
        }
        if (showStart < currTime && currTime < showEnd) {
            isLive = "is-live";
        }
        ///////For interactivity//////////

        return (
            <div key={i}>
                <ul className="day-details">  
                <li className={`${isLive}`}>{data.show}</li>
                <li className={`${isLive}`}>
                    {showStart.format("H:mm")} - {showEnd.format("H:mm")}
                </li>
                </ul>

                <div className="button-container archive-controls">
                    {showEdit ? 
                    <button type="button" onClick={() => handleEdit(false)}>cancel</button>:
                    <button type="button" onClick={() => handleEdit(true)}>edit</button> 
                    }
                    <input className="check-delete" name={data._id} type="checkbox" onChange={handleIDs}></input>
                </div>
                
            </div>
        )
    })

    

    const renderDate = day => {
        if (day.length === 0 ) return null
        ///////For interactivity//////////
        let isLive = "";
        if (parseInt(moment().startOf('day').fromNow().substring(0,2)) > 24) {
            isLive = "was-live";
        }
        ///////For interactivity//////////

        return (
            <ul className="day-dates">
                <li className="day-head">
                    <div className={`${isLive}`}>{moment(day[0].from).format("dddd")}</div> 
                    <div className={`${isLive}`}>{moment(day[0].from).format().substring(0, 10)}</div>
                </li>
                {dates(day)}
            </ul>
        )
    }

    // In theory should render the array, saving some lines in the return below
    // const renderWeek = days => {

    //     for (let i=0; i < days.length; i++) {
    //         renderDate(days[0])
    //     }

    // //     return days.map(day => {
    // //         if (day.length === 0) return
    // //         renderDate(day)
    // //     })
    // }
    
    return (
        <li>
            <h3>{determineWeek()}</h3>
            {/* { renderWeek(days)}  */}
            {renderDate(mon)}
            {renderDate(tue)}
            {renderDate(wed)}
            {renderDate(thu)}
            {renderDate(fri)}
            {renderDate(sat)}
            {renderDate(sun)}
        </li>
    )
}
