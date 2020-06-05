import React from 'react';
import moment from "moment";

export default function ScheduleWeek(data) {
    const week = data.data
    const mon = week.filter(data => moment(data.from).format("dddd") === "Monday");
    const tue = week.filter(data => moment(data.from).format("dddd") === "Tuesday");
    const wed = week.filter(data => moment(data.from).format("dddd") === "Wednesday");
    const thu = week.filter(data => moment(data.from).format("dddd") === "Thursday");
    const fri = week.filter(data => moment(data.from).format("dddd") === "Friday");
    const sat = week.filter(data => moment(data.from).format("dddd") === "Saturday");
    const sun = week.filter(data => moment(data.from).format("dddd") === "Sunday");
  
    
    // const days =[mon, tue, wed, thu, fri, sat, sun];
    
    const dates = day => day.map((data, i) =>{
        // console.log(data)
        return (
        
            <ul key={i} className="day-details">   
            <li>{data.show}</li>
            <li>{moment(data.from).format("H:mm")} - {moment(data.to).format("H:mm")}</li>
            </ul>
        )
    })

    const renderDate = day =>{
        if (day.length === 0 ) return null

        return (

            <ul className="day-dates">
                <li className="day-head">
                    <div>{moment(day[0].from).format("dddd")}</div> 
                    <div>{moment(day.from).format().substring(0, 10)}</div>
                </li>
                {dates(day)}
            </ul>
        )
    }
    
    // const renderWeek = days => {
    //     days.map(day => {
    //         if (day.length === 0 ) return null

    //         return renderDate(day)
    //     })
    // }

    return (
        
        <li>
            <h3>Week {moment(week[0].from).format("W")}</h3>
            {/* { renderWeek(days)} <-- In theory, could make all the lines below obsolete but for some reason it's not working */}
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
