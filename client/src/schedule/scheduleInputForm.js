import React, { useState } from 'react'

export default function ScheduleInputForm() {

    // Constructor for initial value/kind of a placeholder
    const newDate = new Date;
    const currentDate = newDate.toISOString().substring(0 ,10)
    const currentTime = (newDate.toLocaleTimeString().substring(0,5))
    const [time, setTime] = useState(currentDate+"T"+currentTime);
    
    const [host, setHost] = useState("");
    const [show, setShow] = useState("");
    const [from, setFrom] = useState(time);
    const [to, setTo] = useState(time);


    const getTime = () => {
        console.log(new Date(from))
    }


    const handleSubmit = event => {
        event.preventDefault()

        //POST request
        const body = {
            "host": host,
            "show": show,
            "from": from,
            "to": to,
        };

        const postData = async (url, data) => {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"},
                body: JSON.stringify(data)
            })
            return response.json()
        }
        postData("http://localhost:3000/schedule/post", body)
            .then(data => { reload(data) })

        const reload = (data) => {
            if (data.success) {
                window.location.reload()
            } else {
                alert(data.err)
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
                console.log(input)
                setFrom(input)
                break;
                case "to":
                    console.log(input)
                    setTo(input)
                    break;
            default: console.log("Archive Input HandleFormInput ran through without effect")
        }
    };

    return (
        <div>
        <button type="button" value="get time" onClick={() => getTime()}>get time </button>
        <div className="input-form">
            <h2>add to schedule</h2>
            <form className="post-archive">
                <div className="grid-container">
                    
                    
                    <label htmlFor="from">
                        <span className="required">*</span>from
                    <input type="datetime-local" id="from"  value={from} onChange={handleFormInput} />
                    </label> 
                </div>
                <div className="submit-button">
                    <input type="submit" value="Save" /><span className="required">* required</span>
                </div>
            </form>
        </div>
            
        </div>
    )
}
