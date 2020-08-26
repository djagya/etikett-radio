import React, {useContext} from 'react';
import { Context } from "../Context";
import moment from "moment";
import ScheduleEntry from './ScheduleEntry';

export default function ScheduleWeek(data) {
    const {selected, currMonth, currWeek} = useContext(Context)

    const week  = data.data
    if (data.data.length === 0) {return null}
    let thisMonth = moment(week[0].from).format("M")
    let thisWeek = moment(week[0].from).format("w")
    if (moment(week[0].from).format("dddd") === "Sunday") {
        thisWeek = (parseInt(thisWeek) -1).toString()
    } 
    const nextMonth = () => {
        if (parseInt(currMonth) +1 === 13) {
            return "1"
        } else {
        return (parseInt(currMonth) +1).toString()
        }
    }
    
    if (selected === "week" && thisWeek !== currWeek) {return null} 
    if (selected === "month" && thisMonth !== currMonth) {return null} 
    if (selected ==="nextMonth" && thisMonth !== nextMonth()) {return null}
    
    const mon = week.filter(data => moment(data.from).format("dddd") === "Monday");
    const tue = week.filter(data => moment(data.from).format("dddd") === "Tuesday");
    const wed = week.filter(data => moment(data.from).format("dddd") === "Wednesday");
    const thu = week.filter(data => moment(data.from).format("dddd") === "Thursday");
    const fri = week.filter(data => moment(data.from).format("dddd") === "Friday");
    const sat = week.filter(data => moment(data.from).format("dddd") === "Saturday");
    const sun = week.filter(data => moment(data.from).format("dddd") === "Sunday");

    // const days =[mon, tue, wed, thu, fri, sat, sun];

    const determineWeek=() => {
        if (week.length === 0) return
        const dataWeek = moment(week[0].from).format("W");
        const currWeek = moment().format("W");
        return dataWeek === currWeek ? "this week" : `week ${dataWeek}`
    }

    const dates = day => day.map((data, i) => {
        return (
            <ScheduleEntry data={data} key={i} />
        )
    })

    const renderDate = day => {
        if (day.length === 0 ) return null

        ///////For interactivity//////////
        let isPast = "";
        if (day[day.length -1].to < new Date().toISOString()) {
            isPast = "was-live";
        }
        ///////For interactivity//////////

        return (
            <ul className="day-dates">
                <li className="day-head">
                    <div className={`${isPast} day-header`}>{moment(day[0].from).format("dddd")}</div> 
                    <div className={`${isPast}`}>{moment(day[0].from).format().substring(0, 10)}</div>
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
        <ul className={`weekly-schedule`}>
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
        </ul>
    )
}
