import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import moment from "moment";

export default function ScheduleEdit(props) {

    const data = props.data
    const dataFrom = moment(data.from).format()
    const dataTo = moment(data.to).format()
    const timeFrom = dataFrom.toString().substring(0, 10) + "T" + dataFrom.toString().substring(11, 16)
    const timeTo = dataTo.toString().substring(0, 10) + "T" + dataTo.toString().substring(11, 16)

    const [host, setHost] = useState(data.host);
    const [show, setShow] = useState(data.show);
    const [from, setFrom] = useState(timeFrom);
    const [to, setTo] = useState(timeTo);
    const id = data._id;
    const alert = useAlert();


    const handleSubmit = event => {
        event.preventDefault()

        //PUT request
        const body = {
            "host": host,
            "show": show,
            "from": new Date(from),
            "to": new Date(to),
        };

        const postData = async (url, data) => {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            return response.json()
        }
        postData(`/schedule/${id}`, body)
            .then(data => { reload(data) })

        const reload = (data) => {
            if (data.success) {
                alert.success('Schedule modified!', {
                    onClose: () => { window.location.reload() }
                })
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
            default: console.log("Schedule Edit ran through without any effect")
        }
    };





    return (
        <div className="input-form">
            <form className="post-archive" onSubmit={handleSubmit}>
                <div className="edit-grid-container grid-container">

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
                    <input type="submit" value="save" /><span className="required">* required</span>
                </div>
            </form>
        </div>
    )
}
