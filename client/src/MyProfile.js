import React from 'react'

export default function MyProfile(id) {
    return (
        <div>
            <h2>My Profile</h2>
            <button onClick={()=> console.log(id)}>Console.log</button>
        </div>
    )
}
