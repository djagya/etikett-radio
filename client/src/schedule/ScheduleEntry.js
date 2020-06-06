import React, { useState, useContext}  from 'react';
import moment from "moment";
import {Context} from "../Context";
import ScheduleEditForm from './ScheduleEditForm';

export default function ScheduleEntry(props) {
    const [showEdit, setShowEdit] =useState(false);
    const context = useContext(Context)
    const data = props.data



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
        <div >
        <div className="button-container archive-controls">
            {showEdit ? 
            <button type="button" onClick={() => handleEdit(false)}>cancel</button>:
            <button type="button" onClick={() => handleEdit(true)}>edit</button> 
            }
            <input className="check-delete" name={data._id} type="checkbox" onChange={handleIDs}></input>
        </div>
            {showEdit? 
                <ScheduleEditForm data={data} /> :
                <ul className="day-details">  
                    <li className={`${isLive}`}>{data.show}</li>
                    <li className={`${isLive}`}>
                        {showStart.format("H:mm")} - {showEnd.format("H:mm")}
                    </li>
                </ul>
            }
            
        </div>
    )
}
