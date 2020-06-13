import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../Context";
import { Redirect } from 'react-router-dom';
import { useAlert } from 'react-alert';
import GetData from "../GetData";
import PutData from "../PutData";

export default function EditInfoBar(props) {
    const [infoBarMessage, setInfoBarMessage] = useState("")
    const [infoID, setInfoID] = useState("")
    const context = useContext(Context)
    const alert = useAlert();
    useEffect(() => {
    GetData("http://localhost:3000/infobar")
    .then(data => {
        if (!data.success) alert.error("Failed to fetch data, please contact an admin.");
        if (data.status ===403) {
            alert.error("Status 403: Forbidden") 
            return
        }
        if (!data.success) {
            alert.error("Failed to fetch data, please contact an admin")
            return
        };
        setInfoBarMessage(data.infoBar[0].message)
        setInfoID(data.infoBar[0]._id)
    })
    },  [])
console.log(infoBarMessage)
    const handleSubmit = event => {
        event.preventDefault()
        const body = {
            "message": infoBarMessage
        }


    
    PutData(`http://localhost:3000/infobar/${infoID}`, body)
        .then(data => { 
            if (!data.success) { 
                console.log(data)
                alert.error("Something went wrong while updating your data")
            } else {
                alert.success("Update successful!")
            } })
        .then(context.setEditHost(false) )


    }


    const handleFormInput = event => {
        const id = event.target.id;
        const input = event.target.value;
        switch (id) {
            case "infobar-message":
                setInfoBarMessage(input)
                break;
            default: console.log("Edit Input in EditHostPage.js ran through without effect")
            }
        };


    //5ee539eb9de2001478b13589
if (!context.editInfoBar) { return <Redirect to={`/user/${context.id}`} /> }  
    return (
        <div className="input-form not-stream-component">
            <h2>InfoBar Editform</h2>
            <form onSubmit={handleSubmit} role="form">
                <div className="button-container">
                    <button type="button" onClick={() => context.setEditInfoBar(false)}>cancel</button>
                </div>
                <div className="grid-container">
                    <label htmlFor="infobar-message">
                        <span className="required">*</span>info bar message
                        <input type="text" id="infobar-message" placeholder="info bar message" value={infoBarMessage} onChange={handleFormInput} />
                    </label>
                </div>
                <div className="submit-button">
                    <input type="submit" value="Save" /><span className="required">* required</span>
                </div>
            </form>
        </div>
    )
}
