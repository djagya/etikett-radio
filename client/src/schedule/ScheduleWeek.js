import React from 'react';
import moment from "moment";

export default function ScheduleWeek(data) {
    const week = data.data
console.log(week)
    const mon = week.filter(data => moment(data.from).format("dddd") === "Monday");
    const tue = week.filter(data => moment(data.from).format("dddd") === "Tuesday");
    const wed = week.filter(data => moment(data.from).format("dddd") === "Wednesday");
    const thu = week.filter(data => moment(data.from).format("dddd") === "Thursday");
    const fri = week.filter(data => moment(data.from).format("dddd") === "Friday");
    const sat = week.filter(data => moment(data.from).format("dddd") === "Saturday");
    const sun = week.filter(data => moment(data.from).format("dddd") === "Sunday");
    
    // const days =[mon, tue, wed, thu, fri, sat, sun];
    
    const dates = day => day.map((data, i) =>(
        
        <ul key={i} className="day-details">   
        <li>{data.show}</li>
        <li>{moment(data.from).format("H:mm")} - {moment(data.to).format("H:mm")}</li>
        </ul>
    ))

    const renderDate = day => (
        <ul className="day-dates">
        {/* <button type="button" onClick={()=>console.log(day)}>Test button</button> */}
        <li className="day-head">
            <div>{moment(day.from).format("dddd")}</div> 
            <div>{moment(day.from).format().substring(0, 10)}</div>
        </li>
        {dates(day)}
        </ul>
    )
    
    // const renderWeek = (week) => {

    // }
    
    return (
        
        <li>
            <h2>Week {moment(week.from).format("W")}</h2>
            { mon.length === 0 ? null : renderDate(mon)}
            { tue.length === 0 ? null :renderDate(tue)}
            { mon.length === 0 ? null : renderDate(wed)}
            { tue.length === 0 ? null :renderDate(thu)}
            { mon.length === 0 ? null : renderDate(fri)}
            { tue.length === 0 ? null :renderDate(sat)}
            { mon.length === 0 ? null : renderDate(sun)}
        </li>
    )
}
