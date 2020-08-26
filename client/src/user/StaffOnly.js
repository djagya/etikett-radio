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
    return (
        <DocumentTitle title="Staff">
            <div>
                <a href="#maincontent" className="skip-link">Skip to main content</a>
                <div className={`${context.gapClass} staff-only`}>
                    <div>
                        <h2 id="main">logged in as {props.cookies.user.firstName}</h2>
                        <Link className="button-container" to={`/user/${context.id}/edit`}>
                            <button type="button">edit my user data</button>
                        </Link>
                        <Link className="button-container" to={`/user/host/${context.id}`}>
                            <button type="button" onClick={() => context.setEditHostID(context.id)}>edit my host profile</button>
                        </Link>
                        <Link className="button-container" to={`/infobar`}>
                            <button type="button">edit info bar</button>
                        </Link>
                        {props.cookies.user.role === 'Admin' ?
                            <div>
                                <Link className="button-container"  to={`/user/createuser`}>
                                    <button type="button">create new user</button>
                                </Link>
                                <Link className="button-container"  to={`/user/all`}>
                                    <button type="button">all user</button>
                                </Link>
                                <Link className="button-container" to={`/user/hosts/all`}>
                                    <button type="button">all hosts</button>
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
