import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useAlert } from 'react-alert';
import moment from "moment";
import ScheduleInputForm from './ScheduleInputForm';
import Delete from "../Delete";
import ScheduleWeek from './ScheduleWeek';

import DocumentTitle from 'react-document-title';

import { Context } from "../Context";
import Null from '../loading/Null';



export default function Schedule(props) {
    const context = useContext(Context)
    // const [showForm, setShowForm] = useState(false)
    const [checkedIDs, setCheckedIDs] = useState([]);
    // const alert = useAlert();
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState("initial")

    const [scheduleData, setScheduleData] = useState([]);
    // const [weekNum, setWeekNum] = useState([])
    // let weeklySchedule = [];
    let currMonth = moment().format("M");
    let currWeek = moment().format("w");
    
    // useEffect(() => {
    //     setLoading(true);
    //     fetch("/schedule")
    //         .then(res => res.json())
    //         //sorts the incoming data by date
    //         .then(data => {
    //             setLoading(false)
    //             console.log(data)
    //             setScheduleData(data.schedule.sort((entryA, entryB) => new Date(entryA.from) - new Date(entryB.from))) //Initial sort, to get all weeks in the right order
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             setLoading(false);
    //             alert.error('Failed to fetch schedule from the server. Please contact the admin.');
    //         })
    // }, [alert])

    // const handleDelete = (checkedIDs, automatic) => {
    //     //prevent error when nothing is selected
    //     if (checkedIDs.length === 0) {
    //         return
    //     }
    //     //filter copy of schedule data based on checkedID and set the new state
    //     let filteredScheduleData = [...scheduleData];
    //     for (let i = 0; i < checkedIDs.length; i++) {
    //         filteredScheduleData = filteredScheduleData.filter(el => el._id !== checkedIDs[i]);
    //     }
    //     setScheduleData(filteredScheduleData)

    //     //delete from db
    //     Delete(checkedIDs, "schedule")
    //         .then(output => {
    //             if (output) {
    //                 automatic === "automatic" ? alert.success('Schedule from 2 month ago successfully deleted.', { timeout: 2000 }) :
    //                 alert.success('Schedule successfully deleted.', { timeout: 2000 })
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             alert.error('Failed to delete schedule, please contact the admin.');
    //         })
    // }

    // useEffect(() =>{
    //     ///automatically delete data from 2 month ago 
    //     if (props.cookies.user && props.cookies.user.role === 'Admin') {

    //         scheduleData.map(el => {
    //             const current = moment(el.from, "YYYYMMDD").fromNow();
    //             if (current === "2 months ago") {
    //                 // console.log('call handle delete')
    //                 handleDelete([el._id], "automatic")
    //             }
    //         });
    //     }
    // })
    
        
        
    ///////////////////////////////
    //split up schedule into weeks
    ///////////////////////////////
    //Find out Week Numbers of the current month
    // scheduleData.map(el => {

    //     if (scheduleData.length === 0) return
    //     let weekNumber = moment(el.from).format("w");

    //     const num = () => { 
    //         //To fix error where a week only with a sunday date would break the system (because it's recognized as day of the next week)
    //         if (moment(el.from).format("dddd") === "Sunday") {
    //             return (parseInt(weekNumber) - 1).toString()
    //         } else {
    //             return weekNumber
    //         }
    //     }
    //     if (!(weekNum.includes(num()))) { 
    //         setWeekNum([num(), ...weekNum])
    //     }
    // })

    

    
    
    //filter inputData by week number and add array to weeklySchedule

    
    // weekNum.map(weekNum => {
    //     //sort again so also new entries get sorted properly
    //     const sortedMonth = scheduleData.sort((entryA, entryB) => new Date(entryA.from) - new Date(entryB.from))
    //     const week = sortedMonth.filter(data => {
    //         //To make sundays show as the last day of the week, not as the first of the next
    //         const num = () => {
    //             let number = moment(data.from).format("w");
    //             if (moment(data.from).format("dddd") === "Sunday") {
    //                 return (parseInt(number) - 1).toString()
    //             } else {
                    
    //                 return number
    //             }
    //         }
    //         return num() === weekNum
    //     });
    //     weeklySchedule = [week, ...weeklySchedule]
    // })

    ///////////////////////////////

    // const handleSelect = event => {
        
    //     const input = event.target.value
    //     if (input !== selected) {
    //         setSelected(input)
    //     } else return
    // }


    // const renderLi = () => {
    //     if (scheduleData.status === 404) return (<h2>Error 404, something went wrong</h2>)
    //     if (scheduleData.length === 0) return; //Because first time the code is running, scheduleData will be an empty array
    //     return weeklySchedule.reverse().map((el, i) => (
    //         <Fragment key={i}>
    //             <ScheduleWeek data={el} />
    //         </Fragment>
    //     ));
    // };
    

    if (loading) return  <Null /> 

    if (selected === "initial") {
        setSelected("month")
    }
    return (
        <DocumentTitle title="Schedule">
            <Context.Provider value={{ checkedIDs, setCheckedIDs, scheduleData, setScheduleData, selected, currMonth, currWeek }}>
                <div className={`${context.gapClass} schedule-component`}>
                    <div className="schedule-content">
                        <h1 id="main">schedule.</h1>
                        
                        <iframe src="https://calendar.google.com/calendar/embed?src=c_vb7bhkebo9nh35l4o20lrmulm0%40group.calendar.google.com&ctz=Europe%2FBerlin" frameborder="0" scrolling="no"></iframe>
                        {/* <div className="schedule-head">
                            {props.cookies.user && props.cookies.user.role === 'Admin' ?
                                <div className="button-container controls">
                                    {showForm ?
                                        <button type="button" onClick={() => setShowForm(false)}>cancel</button> :
                                        <button type="button" onClick={() => setShowForm(true)}>add schedule</button>
                                    }
                                    <button type="button" onClick={() => handleDelete(checkedIDs)}>delete checked</button>
                                </div>
                                : null}
                            {showForm ? <ScheduleInputForm /> : null}
                            <div className="filter-selector-container">
                            <span className="filter-by-box">show </span>
                                <label htmlFor="show-week" className={`${selected === "week" ? "active" : ""} `} >this week
                                    <input type="radio" id="show-week" name="show-week" onChange={handleSelect} checked={selected === "week"} value="week" />
                                </label>
                                <label htmlFor="show-month" className={`${selected === "initial" || selected === "month" ? "active" : ""} `} >this month
                                    <input type="radio" id="show-month" name="show-month" onChange={handleSelect} checked={selected === "month"} value="month" />
                                </label>
                                <label htmlFor="next-month" className={`${selected === "nextMonth" ? "active" : ""} `} >next month
                                    <input type="radio" id="next-month" name="archive-filter" onChange={handleSelect} checked={selected === "nextMonth"} value="nextMonth" />
                                </label>
                            </div>
                        </div>
                        {weekNum.length === 0 ? <h3>Seems like there is nothing here yet.</h3> :
                        <ul className="monthly-schedule">
                            {renderLi()}
                        </ul>
                        } */}
                    </div>
                </div>
            </Context.Provider>
        </DocumentTitle>
    )
}
