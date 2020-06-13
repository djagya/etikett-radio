import React, { useState, useContext } from 'react';
import moment from "moment";
import { Context } from "../Context";
import ScheduleEditForm from './ScheduleEditForm';
import { useCookies } from 'react-cookie';


export default function ScheduleEntry(props) {
    const [showEdit, setShowEdit] = useState(false);
    const context = useContext(Context)
    const data = props.data
    const [cookies] = useCookies(['user'])

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

    console.log('test')
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
            {cookies.user && cookies.user.role === 'Admin' ?
                <div className="button-container controls">
                    {showEdit ?
                        <button type="button" onClick={() => setShowEdit(false)}>cancel</button> :
                        <button type="button" onClick={() => setShowEdit(true)}>edit</button>
                    }
                    <input className="check-delete" name={data._id} type="checkbox" onChange={handleIDs} role="checkbox"></input>
                </div>
                : null}
            {showEdit ?
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
