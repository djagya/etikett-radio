import React, { useState, useEffect } from 'react'

export default function MyProfile(id) {
    // const param = props.match.params.id
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3000/users/${id.id}`, {
            credentials: "include",
            // headers: {"Content-Type": "application/json"}
        })
            .then(res => res.json())
            .then(data => setUserData(data.user)) 
    }, [])
    return (
        <div>
            <h2>My Profile</h2>
            <button onClick={()=> console.log(userData)}>Console.log</button>
        </div>
    )
}
