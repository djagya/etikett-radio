import React from 'react';
import moment from "moment";

export default function ScheduleWeek(data) {
    const week = data.week

    const mon = week.filter(data => moment(data.from).format("dddd") === "Monday");
    const tue = week.filter(data => moment(data.from).format("dddd") === "Tuesday");
    const wed = week.filter(data => moment(data.from).format("dddd") === "Wednesday");
    const thu = week.filter(data => moment(data.from).format("dddd") === "Thursday");
    const fri = week.filter(data => moment(data.from).format("dddd") === "Friday");
    const sat = week.filter(data => moment(data.from).format("dddd") === "Saturday");
    const sun = week.filter(data => moment(data.from).format("dddd") === "Sunday");
    
    // const days =[mon, tue, wed, thu, fri, sat, sun];
    
    const dates = day => day.map((data, i) =>(
        
        <ul key={i}>
        
        <li>{data.show}</li>
        <li>{data.from}</li>
        <li>{data.to}</li>
        </ul>
        ))
    const renderDate = day => (
        <ul>
        <button type="button" onClick={()=>console.log(day)}>Test button</button>
        <h3>{moment(day.from).format("dddd")}</h3>
        {dates(day)}
        </ul>
    )
    
    
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
