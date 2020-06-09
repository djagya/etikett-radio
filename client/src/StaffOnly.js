import React, {useState} from 'react'
import MyProfile from './MyProfile';

import { Link } from 'react-router-dom';
export default function UserProfile(props) {
    
    const [showProfile, setShowProfile] =useState(false);
    const user = props.cookies.user
    const id= user._id
    
    const handleLogOut = () => {
        props.removeCookie('user', {path: "/"});
        props.removeCookie('x-auth', {path: "/"});
        window.location.assign(`/login`)
    };
    return (
        <div className="not-stream-component">
            <h2>Wassuuuuuuuup {user.firstName} </h2>
            {showProfile ? 
                <button type="button" onClick={() => setShowProfile(false)}>cancel</button>:
                <button type="button" onClick={() => setShowProfile(true)}>edit profile</button> 
            }
            {showProfile ? 
                <MyProfile id={id} />:
                null
            }
            
            {/* {user ? */}
                <button onClick={handleLogOut}>Log Out</button>
            {/* : null } */}
            
        </div>
    )
}
