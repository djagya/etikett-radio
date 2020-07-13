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
    const [showForm, setShowForm] = useState(false)
    const [checkedIDs, setCheckedIDs] = useState([]);
    const alert = useAlert();
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState("initial")

    const [scheduleData, setScheduleData] = useState([]);
    const [weekNum, setWeekNum] = useState([])
    let weeklySchedule = [];
    const currMonth = moment().format("M");
    const currWeek = parseInt(moment().format("W"));
    
    useEffect(() => {
        setLoading(true);
        fetch("/schedule")
            .then(res => res.json())
            //sorts the incoming data by date
            .then(data => {
                setLoading(false)
                setScheduleData(data.schedule.sort((entryA, entryB) => new Date(entryA.from) - new Date(entryB.from))) //Initial sort, to get all weeks in the right order
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                alert.error('Failed to fetch schedule from the server. Please contact the admin.');
            })
    }, [])

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
        Delete(checkedIDs, "schedule").then(output => {
            if (output) {
                alert.success('Schedule(s) successfully deleted.', {
                    onClose: () => { window.location.reload() }
                })
            } else {
                alert.error('Failed to delete schedule, please contact the admin.');
            }
        });

    }

    ///automatically delete data from 2 month before 
    scheduleData.map(el => {
        const current = moment(el.from, "YYYYMMDD").fromNow();
        if (current === "2 months ago") {
            handleDelete([el._id])
        }
    })

    ///////////////////////////////
    //split up schedule into weeks
    ///////////////////////////////
    //Find out Week Numbers of the current month
    const sortDates = input => {
        console.log(selected)
        console.log(input)
        if (input === selected) return

        if (input === "month") {
            console.log("month is running")
                scheduleData.map(el => {
                    if (scheduleData.length === 0) return
                    const month = moment(el.from).format("M")
                    let number = moment(el.from).format("w");
                    const num = () => { 
                        //To fix error where a week only with a sunday date would break the system (because it's recognized as day of the next week)
                        if (moment(el.from).format("dddd") === "Sunday") {
                            return (parseInt(number) - 1).toString()
                        } else {
                            return number
                        }
                    }
                        return weekNum.includes(num()) || month !== currMonth ? null : setWeekNum([num(), ...weekNum])
                })
            }
        if (input === "week") {
            console.log("week is running")
            setWeekNum([moment().format("w")])
        }


    }
    
    //filter inputData by week number and add array to weeklySchedule
    weekNum.map(weekNum => {
        //sort again so also new entries get sorted properly
        const sortedMonth = scheduleData.sort((entryA, entryB) => new Date(entryA.from) - new Date(entryB.from))
        const week = sortedMonth.filter(data => {
            //To make sundays show as the last day of the week, not as the first of the next
            const num = () => {
                let number = moment(data.from).format("w");
                if (moment(data.from).format("dddd") === "Sunday") {
                    return (parseInt(number) - 1).toString()
                } else {
                    
                    return number
                }
            }
            return num() === weekNum
        });
        weeklySchedule = [week, ...weeklySchedule]
    })
    ///////////////////////////////


    const handleSelect = event => {
        
        const input = event.target.value
        if (input !== selected) {
            setSelected(input)
            sortDates(input)
        } else return
    }


    const renderLi = () => {
        if (scheduleData.status === 404) return (<h2>Error 404, something went wrong</h2>)
        if (scheduleData.length === 0) return; //Because first time the code is running, scheduleData will be an empty array
        
        return weeklySchedule.reverse().map((el, i) => (
            <Fragment key={i}>
                <ScheduleWeek data={el} />
            </Fragment>
        ));
    };

    if (selected === "initial") {
        sortDates("month")
        console.log("test")
    }
    
    if (loading) return  <Null /> 
    return (
        <DocumentTitle title="Schedule">
            <Context.Provider value={{ checkedIDs, setCheckedIDs, scheduleData, setScheduleData }}>
                <div className={`${context.gapClass} schedule-page`}>
                    <div className="schedule-content">
                        <h2 id="main">schedule.</h2>
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
                                <label htmlFor="show-relevant" className={`${selected === "relevant" ? "active" : ""} `} >relevant
                                    <input type="radio" id="show-relevant" name="show-relevant" onChange={handleSelect} checked={selected === "relevant"} value="relevant" />
                                </label>
                                <label htmlFor="show-week" className={`${selected === "week" ? "active" : ""} `} >this week
                                    <input type="radio" id="show-week" name="show-week" onChange={handleSelect} checked={selected === "week"} value="week" />
                                </label>
                                <label htmlFor="show-month" className={`${selected === "month" || "initial" ? "active" : ""} `} >this month
                                    <input type="radio" id="show-month" name="show-month" onChange={handleSelect} checked={selected === "month"} value="month" />
                                </label>
                                <label htmlFor="next-month" className={`${selected === "nextMonth" ? "active" : ""} `} >next month
                                    <input type="radio" id="next-month" name="archive-filter" onChange={handleSelect} checked={selected === "nextMonth"} value="nextMonth" />
                                </label>
                            </div>
                        <ul className="monthly-schedule">
                            {renderLi()}
                        </ul>
                    </div>
                </div>
            </Context.Provider>
        </DocumentTitle>
    )
}
