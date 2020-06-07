import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function UserList(props) {

    const [userData, setUserData] = useState([])
    useEffect(() => {
        fetch("http://localhost:3000/users", {credentials: 'include'})
            .then(res => res.json())
            .then(data => setUserData(data))
    }, [])

    const renderLi = (userData) => {
        
        // Render login and create account links
        if (userData.status === 403) return (<h2> <Link to="/user/createuser">Create New Account</Link>  || <Link to="/user/login">Log In</Link></h2>)

        //Because first time the code is running, userData will be an empty array
        if (!userData.users) return null; 

        return userData.users.map((el, i) => (
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
            <button>Log Out</button>
            <ul>
                {renderLi(userData)}
            </ul>
        </div>
    )
}
