import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../Context";
import { Redirect } from 'react-router-dom';
import { useAlert } from 'react-alert';
import GetData from "../GetData";

export default function EditInfoBar(props) {
    const [infoText, setInfoText] = useState("")
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
        setInfoText(data.infoBar[0])
    })
},  [])
    //5ee539eb9de2001478b13589
  console.log(infoText)
if (!context.editInfoBar) { return <Redirect to={`/user/${context.id}`} /> }  
    return (
        <div className="input-form not-stream-component">
            <h2>InfoBar Editform</h2>
            {/* <form onSubmit={handleSubmit} role="form">
                <div className="button-container">
                    <button type="button" onClick={() => context.setEditInfoBar(false)}>cancel</button>
                </div>
                <div className="grid-container">
                    <label htmlFor="infobar-message">
                        <span className="required">*</span>info bar message
                        <input type="text" id="infobar-message" placeholder="First Name" value={infobarMessage} onChange={handleFormInput} />
                    </label>
                </div>
            </form> */}
        </div>
    )
}
