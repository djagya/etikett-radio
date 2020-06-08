import React, { useState, useEffect } from 'react'

export default function MyProfile(id) {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/user/${id}`)
            .then(res => res.json())
            .then(data => setUserData(data.archive))
    })

    return (
        <div>
            <h2>My Profile</h2>
            <button onClick={()=> console.log(id)}>Console.log</button>
        </div>
    )
}
