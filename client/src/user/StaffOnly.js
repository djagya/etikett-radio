import React, { useContext } from 'react';
import { Context } from "../Context";
import { Redirect } from 'react-router-dom';


export default function UserProfile(props) {
    const context = useContext(Context);




    const handleLogOut = () => {
        props.removeCookie('user', { path: "/" });
        props.removeCookie('x-auth', { path: "/" });
        props.setName(null);
        props.removeCookie('name', { path: "/"});
        props.history.push("/login")
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
            <div className={`${context.gapClass} staff-only`}>
                <div>
                    <h2 id="main">logged in as {props.cookies.user.firstName}</h2>
                    <div className="button-container">
                    <button type="button" onClick={() => context.setProfileEdit(true)}>edit my user data</button>
                    </div>
                    <div className="button-container">
                    <button type="button" onClick={() => {
                        context.setEditHostID(context.id)
                        context.setEditHost(true)
                    }}>edit my host profile
                    </button>
                    </div>
                    <div className="button-container">
                    <button type="button" onClick={() => context.setEditInfoBar(true)}>edit info bar</button>
                    </div>
                    {props.cookies.user.role === 'Admin' ?
                        <div>
                            <div className="button-container">
                            <button type="button" onClick={() => context.setCreateProfile(true)}>create new user</button>
                            </div>
                            <div className="button-container">
                            <button type="button" onClick={() => context.setAllUser(true)}>all user</button>
                            </div>
                            <div className="button-container">
                            <button type="button" onClick={() => context.setAllHosts(true)}>all hosts</button>
                            </div>
                        </div>
                        : null}
                    <div className="button-container">
                    <button onClick={handleLogOut}>log out</button>
                    </div>
                </div>

            </div>
        </>

    )
}
