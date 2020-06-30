import React, { useContext } from 'react';
import { Context } from "../Context";
import { Redirect, Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import Null from '../loading/Null';


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

    // if (context.profileEdit) {
    //     return <Redirect to={`/user/${context.id}/edit`} />
    // }
    if (context.createProfile) {
        return <Redirect to={`/user/createuser`} />
    }
    if (context.allUser) {
        return <Redirect to={`/user/all`} />
    }
    // if (context.allHosts) {
    //     return <Redirect to={`/user/hosts/all`} />
    // }
    if (context.editInfoBar) {
        return <Redirect to={`/infobar`} />
    }
    return (
        <DocumentTitle title="Staff">
            <div>
                <a href="#maincontent" className="skip-link">Skip to main content</a>
                <div className={`${context.gapClass} staff-only`}>
                    <div>
                        <h2 id="main">logged in as {props.cookies.user.firstName}</h2>
                        {/* <Link className="button-container" to={`/user/${context.id}`}><button type="button">back</button></Link> */}
                        <Link className="button-container" to={`/user/${context.id}/edit`}>
                            <button type="button">edit my user data</button>
                        </Link>



                        <Link className="button-container" to={`/user/host/${context.id}`}>
                            <button type="button" onClick={() => context.setEditHostID(context.id)}>edit my host profile
                            </button>
                        </Link>



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
                                <Link className="button-container" to={`/user/hosts/all`}><button type="button">all hosts</button></Link>
                                
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
