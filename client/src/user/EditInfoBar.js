import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../Context";
import { Redirect } from 'react-router-dom';
import { useAlert } from 'react-alert';
import PutData from "../PutData";

export default function EditInfoBar(props) {
    const context = useContext(Context)
    const alert = useAlert();

    const handleSubmit = event => {
        event.preventDefault()
        const body = {
            "message": context.infoBarMessage
        }

        PutData(`http://localhost:3000/infobar/${context.infoID}`, body)
            .then(data => {
                if (!data.success) {
                    console.log(data)
                    alert.error("Something went wrong while updating your data")
                } else {
                    alert.success("Update successful!")
                }
            })
            .then(context.setEditInfoBar(false))
    }

    const handleFormInput = event => {
        const input = event.target.value;
        context.setInfoBarMessage(input)
    }

    if (!context.editInfoBar) { return <Redirect to={`/user/${context.id}`} /> }
    return (
        <div className={`${context.gapClass} input-form`}>
            <h2 id="main">info bar</h2>
            <form onSubmit={handleSubmit} role="form" className="edit-input-form">
                <div className="button-container">
                    <button type="button" onClick={() => context.setEditInfoBar(false)}>cancel</button>
                </div>
                <div className="info-bar-input-container">
                    <label htmlFor="infobar-message">
                        <input type="text" id="infobar-message" placeholder="info bar message" value={context.infoBarMessage} onChange={handleFormInput} />
                    </label>
                </div>
                <div className="submit-button">
                    <input type="submit" value="save" />
                </div>
            </form>
        </div>
    )
}
