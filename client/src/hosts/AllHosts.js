import React, { useState, useEffect, useContext } from 'react'
import {Context} from "../Context";
import {Redirect} from 'react-router-dom';
import GetData from "../GetData";



export default function AllHosts() {
    const context = useContext(Context);
    useEffect(() => {
        GetData("http://localhost:3000/host")
            .then(res => console.log(res.json))

    })

    if (!context.allHosts) {return <Redirect to={`/user/${context.id}`}/>}
    return (
        <div className="not-stream-component">
            <h2>all hosts</h2>
            <div className="button-container">
                    <button type="button" onClick={() => context.setAllHosts(false)}>cancel</button>
                </div>
        </div>
    )
}
