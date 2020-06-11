import React, { useState, useContext } from 'react'
import {Context} from "../Context";
import {Redirect} from 'react-router-dom';


export default function EditHostPage() {
    const context = useContext(Context)


    if (!context.editHost) {return <Redirect to={`/user/${context.id}`}/>}
    return (
        <div className="not-stream-component">
            <h2>Edit Host Page</h2>
            <div className="button-container">
                <button type="button" onClick={() => context.setEditHost(false)}>cancel</button>
            </div>
        </div>
    )
}
