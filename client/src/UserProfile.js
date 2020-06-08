import React from 'react'

export default function UserProfile(props) {
    const user = props.cookies.user;
    const handleLogOut = () => {
        props.removeCookie('user');
        props.removeCookie('x-auth');
    };
    return (
        <div>
            <h2>User Profile</h2>

            {/* {user ? */}
                <button onClick={handleLogOut}>Log Out</button>
            {/* : null } */}
            
        </div>
    )
}
