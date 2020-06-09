import React, {useState, useContext} from 'react'
import MyProfile from './EditMyProfile';
import {Context} from "../Context"

import CreateUser from './CreateUser';
export default function UserProfile(props) {
    const context = useContext(Context)

    const [profileEdit, setProfileEdit] =useState(false);
    const [showCreate, setShowCreate] =useState(false);
    const id= props.cookies.user._id

    const handleLogOut = () => {
        props.removeCookie('user', {path: "/"});
        props.removeCookie('x-auth', {path: "/"});
        window.location.assign(`/login`)
    };
  
    return (
        <Context.Provider value={{profileEdit, setProfileEdit}}>
            <div className="not-stream-component staff-only">
                <h2>Wassuuuuuuuup {context.name}</h2>
                {profileEdit ? 
                    <button type="button" onClick={() => setProfileEdit(false)}>cancel</button>:
                    <button type="button" onClick={() => setProfileEdit(true)}>edit my profile</button> 
                }
                {profileEdit ? 
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
