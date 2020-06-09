import React, {useState} from 'react'
import MyProfile from './MyProfile';

import CreateUser from './CreateUser';
export default function UserProfile(props) {
    
    const [showProfile, setShowProfile] =useState(false);
    const [showCreate, setShowCreate] =useState(false);
    const user = props.cookies.user
    const id= user._id
    console.log(user.role)
    const handleLogOut = () => {
        props.removeCookie('user', {path: "/"});
        props.removeCookie('x-auth', {path: "/"});
        window.location.assign(`/login`)
    };
    return (
        <div className="not-stream-component staff-only">
            <h2>Wassuuuuuuuup {user.firstName} </h2>
            {showProfile ? 
                <button type="button" onClick={() => setShowProfile(false)}>cancel</button>:
                <button type="button" onClick={() => setShowProfile(true)}>edit profile</button> 
            }
            {showProfile ? 
                <MyProfile props={props} id={id} />:
                null
            }
            
            {showCreate ? 
                <button type="button" onClick={() => setShowCreate(false)}>cancel</button>:
                <button type="button" onClick={() => setShowCreate(true)}>create new profile</button> 
            }
            {showCreate ? 
                <CreateUser />:
                null
            }
            {/* {user ? */}
                <button onClick={handleLogOut}>log out</button>
            {/* : null } */}
            
        </div>
    )
}
