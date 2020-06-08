import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function UserList(props) {

    const [userData, setUserData] = useState([]);
    const user = props.cookies.user;

    useEffect(() => {
        fetch("http://localhost:3000/user", {credentials: 'include'})
            .then(res => res.json())
            .then(data => setUserData(data))
    }, [])

    const handleLogOut = () => {
        props.removeCookie('user');
        props.removeCookie('x-auth');
    };

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

    if (!user) { 
        return (
            <div className="not-stream-component">
                <h2><Link to="/user/login">log in</Link></h2>
            </div>
        ) 
    }
    
    return (
        <div className="not-stream-component">
            {user ?
                <button onClick={handleLogOut}>Log Out</button>
            : null }

            {user.role === 'Admin' ?
                <ul>
                    {renderLi(userData)}
                </ul>
            : 
                <h3>Hello {user.firstName}! Welcome to etikett radio</h3>
            }

        </div>
    )
}
