import React, { useState } from 'react'

export default function ScheduleInputForm() {

    // Constructor for initial value/kind of a placeholder
    const newDate = new Date();
    const currentDate = newDate.toISOString().substring(0 ,10)
    const currentTime = (newDate.toString().substring(16 ,21))
    const time = currentDate+"T"+currentTime;
    
    const [host, setHost] = useState("");
    const [show, setShow] = useState("");
    const [from, setFrom] = useState(time);
    const [to, setTo] = useState(time);

  


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
                setFrom(input)
                setTo(input)
                break;
                case "to":
                setTo(input)
                break;
            default: console.log("Schedule Input HandleFormInput ran through without effect")
        }
    };

    const repetitiveInputFields = () => {
        const fields = ["host", "show"];
        const value = [host, show];
        return fields.map((field, i) => (
                <label key={i} htmlFor={field}>
                    <span className="required">*</span>{field}
                    <input type="text" id={field} placeholder={field} value={value[i]} onChange={handleFormInput} />
                </label>
            ));
    };

    return (
        
        <div className="input-form">
            <h2>add to schedule</h2>
            <form className="post-archive" onSubmit={handleSubmit}>
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
                    <input type="datetime-local" id="from"  value={from} onChange={handleFormInput} />
                    </label> 
                    <label htmlFor="to">
                        <span className="required">*</span>to
                    <input type="datetime-local" id="to"  value={to} onChange={handleFormInput} />
                    </label> 
                </div>
                <div className="submit-button">
                    <input type="submit" value="Save" /><span className="required">* required</span>
                </div>
            </form>
        </div>
            
        
    )
}
