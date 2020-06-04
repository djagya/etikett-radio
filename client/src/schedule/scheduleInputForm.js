import React, { useState } from 'react'

export default function ScheduleInputForm() {
    const newDate = new Date;
    const currentDate = newDate.toISOString().substring(0 ,10)
    const currentTime = (newDate.toLocaleTimeString().substring(0,5))

    const [time, setTime] = useState(currentDate+"T"+currentTime);
    

    const getTime = () => {
        console.log(new Date(time))
    }



    const handleFormInput = event => {
        const id = event.target.id;
        const input = event.target.value;
        switch (id) {
            case "time":
                setTime(input)
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
                    
                    
                    <label htmlFor="time">
                        <span className="required">*</span>time
                    <input type="datetime-local" id="time"  value={time} onChange={handleFormInput} />
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
