import React, { useState, useEffect } from 'react';
import {Context} from "../Context";

export default function AllUser() {
    const [userData, setUserData] = useState([]);


    useEffect(() => {

        fetch("http://localhost:3000/users", {
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => setUserData(data.users.sort((userB, userA)=>userA.firstName - userB.firstName))) 
    }, [])

    const renderLi =  user => {
        console.log(user)
    }

    const renderUsers = userData => {
        userData.map(user =>
            renderLi(user)
            )

    }

    console.log(userData)
    return (
        <div className="not-stream-component">
            <h2>All Users</h2>
            {renderUsers(userData)}
        </div>
    )
}
