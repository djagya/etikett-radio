import React, { useContext, useEffect } from 'react'
import { Context } from "../Context"
import { Redirect } from 'react-router-dom';


export default function UserProfile(props) {
    const context = useContext(Context)

   
    

    const handleLogOut = () => {
        props.removeCookie('user', { path: "/" });
        props.removeCookie('x-auth', { path: "/" });
        window.location.assign(`/login`)
    };

    if (context.profileEdit) {
        return <Redirect to={`/user/${context.id}/edit`} />
    }
    if (context.createProfile) {
        return <Redirect to={`/user/createuser`} />
    }
    if (context.allUser) {
        return <Redirect to={`/user/all`} />
    }
    if (context.editHost) {
        return <Redirect to={`/hosts/${context.id}`} />
    }
    if (context.allHosts) {
        return <Redirect to={`/hosts/all`} />
    }
    if (context.editInfoBar) {
        return <Redirect to={`/infobar`} />
    }
    return (

        <>
            <a href="#maincontent" className="skip-link">Skip to main content</a>
            <div className="not-stream-component staff-only">
            <div>
                <h2>logged in as {props.cookies.user.firstName}</h2>
                <button type="button" onClick={() => context.setProfileEdit(true)}>edit my user data</button>
                <button type="button" onClick={() => {
                    context.setEditHostID(context.id)
                    context.setEditHost(true)
                    }}>edit my host profile
                </button>
                <button type="button" onClick={() => context.setEditInfoBar(true)}>edit info bar</button>
                {props.cookies.user.role === 'Admin' ?
                    <div>
                        <button type="button" onClick={() => context.setCreateProfile(true)}>create new user</button>
                        <button type="button" onClick={() => context.setAllUser(true)}>all user</button>
                        <button type="button" onClick={() => context.setAllHosts(true)}>all hosts</button>
                    </div>
                    : null}
                <button onClick={handleLogOut}>log out</button>

                </div>

            </div>
        </>

    )
}
