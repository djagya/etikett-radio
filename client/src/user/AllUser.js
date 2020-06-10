import React, { useState, useEffect } from 'react';
import {Context} from "../Context";

export default function AllUser() {
    const [userData, setUserData] = useState([]);

    let sortedData = userData.sort((userA, userB)=>(userA.firstName < userB.firstName)? -1 : 1)



    useEffect(() => {

        fetch("http://localhost:3000/users", {
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => setUserData(data.users)) 
    }, [])

   

    const renderLi = (userData) => {
        
        // Render login and create account links
        if (userData.status === 403) return (<h2>please log in as admin</h2>)

        //Because first time the code is running, userData will be an empty array
        if (userData.length === 0) return null; 
        console.log(userData)
        return userData.map((el, i) => (
            <li key={i}>
                <ul>
                    <li>First Name: {el.firstName}</li>
                    <li>Last Name: {el.lastName}</li>
                    <li>User Name: {el.userName}</li>
                    <li>Email: {el.email}</li>
                    <li>Role: {el.role}</li>
                </ul>
            </li>
        ));
    };

    return (
        <div className="not-stream-component">
            <h2>All Users</h2>
            <div className="user-list">
                <ul>
                    <li>first name</li>
                    <li>sast name</li>
                    <li>user name</li>
                    <li>email</li>
                    <li>role</li>
                </ul>
                <ul>
                {renderLi(sortedData)}
                </ul>
            </div>
        </div>
    )
}
