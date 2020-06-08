import React from 'react'

export default function UserProfile(props) {
    
    const handleLogOut = () => {
        props.removeCookie('user', {path: "/"});
        props.removeCookie('x-auth', {path: "/"});
        window.location.assign(`/user/login`)
    };
    return (
        <div>
            <h2>User Profile</h2>
            <button onClick={()=> console.log(props)}>Console.log</button>
            {/* {user ? */}
                <button onClick={handleLogOut}>Log Out</button>
            {/* : null } */}
            
        </div>
    )
}
