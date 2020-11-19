import React, { useContext } from 'react';
import { Context } from "../Context";
import { Redirect, Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';


export default function UserProfile(props) {
    const context = useContext(Context);




    const handleLogOut = () => {
        props.removeCookie('user', { path: "/" });
        props.removeCookie('x-auth', { path: "/" });
        props.setName(null);
        props.removeCookie('name', { path: "/" });
        context.socket.disconnect();
        props.history.push("/login")
    };
    if (context.createProfile) {
        return <Redirect to={`/user/createuser`} />
    }
    if (context.allUser) {
        return <Redirect to={`/user/all`} />
    }
    console.log(props.cookies.user.userName)
    return (
        <DocumentTitle title="Staff">
            <div>
                {/* <a href="#maincontent" className="skip-link">Skip to main content</a> */}
                <div className={`${context.gapClass} staff-only`}>
                    <div>
                        <h1 id="main">logged in as {props.cookies.user.userName}</h1>
                        <Link className="button-container" to={`/user/${context.id}/edit`}>
                            <button type="button">edit my user data</button>
                        </Link>
                        <Link className="button-container" to={`/user/show/${context.id}`}>
                            <button type="button" onClick={() => context.setEditHostID(context.id)}>edit my show profile</button>
                        </Link>
                        {props.cookies.user.role === 'Admin' ?
                            <div>
                                <Link className="button-container" to={`/infobar`}>
                                    <button type="button">edit info bar</button>
                                </Link>
                                <Link className="button-container"  to={`/user/createuser`}>
                                    <button type="button">create new user</button>
                                </Link>
                                <Link className="button-container"  to={`/user/all`}>
                                    <button type="button">all user</button>
                                </Link>
                                <Link className="button-container" to={`/user/shows/all`}>
                                    <button type="button">all shows</button>
                                </Link>
                            </div>
                        : null}
                        <div className="button-container">
                            <button onClick={handleLogOut}>log out</button>
                        </div>
                    </div>

                </div>
            </div>
        </DocumentTitle>

    )
}
