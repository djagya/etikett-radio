import React, { useContext } from 'react'
import { Context } from "../Context"
import { Redirect } from 'react-router-dom';
import './StaffOnly.scss';


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

    return (

        <div className="not-stream-component staff-only">
            <div>
                <h2>logged in as {props.cookies.user.firstName}</h2>
                <button type="button" onClick={() => context.setProfileEdit(true)}>edit my user data</button>
                <button type="button" onClick={() => context.setEditHost(true)}>edit my host profile</button>
                {props.cookies.user.role === 'Admin' ?
                    <div>
                        <button type="button" onClick={() => context.setCreateProfile(true)}>create new user</button>
                        <button type="button" onClick={() => context.setAllUser(true)}>all user</button>
                    </div>
                    : null}
                <button onClick={handleLogOut}>log out</button>

            </div>
        </div>

    )
}
