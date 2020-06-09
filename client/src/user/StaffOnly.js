import React, {useState, useContext} from 'react'
import {Context} from "../Context"
import { Redirect } from 'react-router-dom';

import CreateUser from './CreateUser';

export default function UserProfile(props) {
    const context = useContext(Context)
    
    const [showCreate, setShowCreate] =useState(false);

    const handleLogOut = () => {
        props.removeCookie('user', {path: "/"});
        props.removeCookie('x-auth', {path: "/"});
        window.location.assign(`/login`)
    };

  if (context.showProfileEdit)  {
    return <Redirect  to={`/user/${context.id}/edit`} />}

    return (
        
            <div className="not-stream-component staff-only">
                <h2>logged in as {props.cookies.user.firstName}</h2>
                <button type="button" onClick={() => context.setShowProfileEdit(true)}>edit my profile</button>
                
                
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
