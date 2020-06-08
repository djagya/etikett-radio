import React from 'react'

export default function UserProfile(props) {
    const user = props.cookies.user
    
    const handleLogOut = () => {
        props.removeCookie('user', {path: "/"});
        props.removeCookie('x-auth', {path: "/"});
        window.location.assign(`/user/login`)
    };
    return (
        <div>
            <h2>Wassuuuuuuuup {user.firstName} </h2>
            <button onClick={()=> console.log(user)}>Console.log</button>
            {/* {user ? */}
                <button onClick={handleLogOut}>Log Out</button>
            {/* : null } */}
            
        </div>
    )
}
