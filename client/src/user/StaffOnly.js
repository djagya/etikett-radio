import React, {useState, useContext} from 'react'
import {Context} from "../Context"
import { Redirect } from 'react-router-dom';


export default function UserProfile(props) {
    const context = useContext(Context)
    
    const [showCreate, setShowCreate] =useState(false);

    const handleLogOut = () => {
        props.removeCookie('user', {path: "/"});
        props.removeCookie('x-auth', {path: "/"});
        window.location.assign(`/login`)
    };

    if (context.showProfileEdit)  {
        return <Redirect  to={`/user/${context.id}/edit`} />
    }
    if (context.showCreateProfile) {
        return <Redirect to={`/user/createuser`}/>
    }

    return (
        
            <div className="not-stream-component staff-only">
                <div>
                <h2>logged in as {props.cookies.user.firstName}</h2>
                <button type="button" onClick={() => context.setShowProfileEdit(true)}>edit my profile</button>
                <button type="button" onClick={() => context.setShowCreateProfile(true)}>create new user</button>

                <button onClick={handleLogOut}>log out</button>
                
                </div>
            </div>
        
    )
}
