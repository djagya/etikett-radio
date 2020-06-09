import React, {useState, useContext} from 'react'
import MyProfile from './EditMyProfile';
import {Context} from "../Context"

import CreateUser from './CreateUser';
export default function UserProfile(props) {
    
    const [showProfile, setShowProfile] =useState(false);
    const [showCreate, setShowCreate] =useState(false);
    const [user, setUser] =useState(props.cookies.user.firstName)
    const id= props.cookies.user._id

    const handleLogOut = () => {
        props.removeCookie('user', {path: "/"});
        props.removeCookie('x-auth', {path: "/"});
        window.location.assign(`/login`)
    };
  
    return (
        <Context.Provider value={{user, setUser}}>
            <div className="not-stream-component staff-only">
                <h2>Wassuuuuuuuup {user}</h2>
                {showProfile ? 
                    <button type="button" onClick={() => setShowProfile(false)}>cancel</button>:
                    <button type="button" onClick={() => setShowProfile(true)}>edit my profile</button> 
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
        </Context.Provider>
    )
}
