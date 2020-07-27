import React, { useState, useContext } from 'react';
import { useAlert } from 'react-alert';
import { Context } from '../Context';

export default function ScheduleInputForm() {
    const context = useContext(Context)
    // Constructor for initial value/kind of a placeholder
    const newDate = new Date();
    const currentDate = newDate.toISOString().substring(0, 10);
    const currentTime = newDate.toString().substring(16, 21);
    const time = currentDate + "T" + currentTime;


    const [host, setHost] = useState("");
    const [show, setShow] = useState("");
    const [from, setFrom] = useState(time);
    const [to, setTo] = useState(time);
    const alert = useAlert();

    const handleSubmit = event => {
        event.preventDefault()

        //POST request
        const body = {
            "host": host,
            "show": show,
            "from": new Date(from),
            "to": new Date(to),
        };

        const postData = async (url, data) => {
            const response = await fetch(url, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            return response.json()
        }
        postData("/schedule/post", body)
            .then(data => { reload(data) })

        const reload = (data) => {
            if (data.success) {
                context.setScheduleData([...context.scheduleData, body])
                setHost("")
                setShow("")
                setFrom(time)
                setTo(time)
                alert.success('Schedule posted!', { timeout: 2000 });

            } else {
                alert.error(data.err);
            }
        }
    }
    
    const handleFormInput = event => {
        const id = event.target.id;
        const input = event.target.value;
        switch (id) {
            case "host":
                setHost(input)
                break;
            case "show":
                setShow(input)
                break;
            case "from":
                setFrom(input)
                setTo(input)
                break;
            case "to":
                setTo(input)
                break;
            default: console.log("Schedule Input ran through without any effect")
        }
    };
    return (
        <div className="input-form schedule-input">
            <h2>add to schedule</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid-container">

                    <label htmlFor="host">
                        host
                        <input type="text" id="host" placeholder="host" value={host} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="show">
                        <span className="required">*</span>show
                        <input type="text" id="show" placeholder="show" value={show} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="from">
                        <span className="required">*</span>from
                    <input type="datetime-local" id="from" value={from} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="to">
                        <span className="required">*</span>to
                    <input type="datetime-local" id="to" value={to} onChange={handleFormInput} />
                    </label>
                </div>
                <div className="submit-button">
                    <input type="submit" value="save" role="button" /><span className="required">* required</span>
                </div>
            </form>
        </div>


    )
}
