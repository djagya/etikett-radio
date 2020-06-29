import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../Context";
import { Redirect } from 'react-router-dom';
import { useAlert } from 'react-alert';
import PatchData from "../PatchData";


export default function MyProfile(props) {
    const user = props.cookies.user;
    const context = useContext(Context);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [pw, setPW] = useState("");
    const [role, setRole] = useState("");
    const alert = useAlert();
    const [editProfile, setEditProfile] = useState(false);
    const [editPW, setEditPW] = useState(false);

    useEffect(() => {
        fetch(`/users/${context.id}`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => { 
                if(data.status === 403) {
                alert.error("Status 403: Forbidden");
                return
            }
                if(data.success){
                setFirstName(data.user.firstName)
                setLastName(data.user.lastName)
                setUserName(data.user.userName)
                setEmail(data.user.email)
                setRole(data.user.role)

            } else {
                console.log(data)
                alert.error("Something went wrong");
                return
            }
            })

    }, [context.id])

    const handlePatch = body => {
        PatchData(`/users/${context.id}`, body)
            .then(data => {
                if (!data.success) {
                    console.log(data)
                    alert.error('Something went wrong...');
                } else {
                    props.setCookie('user', data.user, { path: '/' })
                    alert.success('Profile edited!', { timeout: 3000 });
                }
            })
            // .then(context.setProfileEdit(false))
    }    

    const handlePersonalSubmit = event => {
        event.preventDefault()
        const body = {
            "firstName": firstName,
            "lastName": lastName,
            "userName": userName,
            "email": email,
            "role": role
        };
        handlePatch(body)
    }

    const handlePWSubmit = event => {
        event.preventDefault()
        const body = {
            "pw": pw,
        };
        handlePatch(body)
    }

    const handleFormInput = event => {
        const id = event.target.id;
        const input = event.target.value;
        switch (id) {
            case "firstName":
                setFirstName(input)
                break;
            case "lastName":
                setLastName(input)
                break;
            case "userName":
                setUserName(input)
                break;
            case "email":
                setEmail(input)
                break;
            case "pw":
                setPW(input)
                break;
            case "role":
                setRole(input)
                break;
            default: console.log("Sign up Input in SignUp.js ran through without effect")
        }
    };

    if (!context.profileEdit) { return <Redirect to={`/user/${context.id}`} /> }

    return (
        <div>
            <div className={`${context.gapClass} input-form`}>
                <h2 id="main">my profile.</h2>
                <div>
                {!editPW && !editProfile ?
                    <div className="button-container">
                        <button type="button" onClick={() => context.setProfileEdit(false)}>back</button>
                    </div> : null
                    }
                    {editProfile ? 
                        
                        <form onSubmit={handlePersonalSubmit} role="form">
                            <div className="button-container staff-only">
                                <button type="button" onClick={() => setEditProfile(false)}>cancel</button>
                            </div>
                            <div className="grid-container">
                                <label htmlFor="firstName">
                                    <span className="required">*</span>first name
                                <input type="text" id="firstName" placeholder="First Name" value={firstName} onChange={handleFormInput} />
                                </label>
                                <label htmlFor="lastName">
                                    <span className="required">*</span>last name
                                <input type="text" id="lastName" placeholder="Last Name" value={lastName} onChange={handleFormInput} />
                                </label>
                                <label htmlFor="userName">
                                    <span className="required">*</span>user name
                                <input type="text" id="userName" placeholder="User Name" value={userName} onChange={handleFormInput} />
                                </label>
                                <label htmlFor="email">
                                    <span className="required">*</span>email
                                <input type="text" id="email" placeholder="Email" value={email} onChange={handleFormInput} />
                                </label>
                                {user && user.role === 'Admin' ?
                                    <label htmlFor="role">
                                        <span className="required">*</span>role
                                <select id="role" value={role} onChange={handleFormInput}>
                                            <option>Admin</option>
                                            <option>Host</option>
                                        </select>
                                    </label>
                                    : null}
                            </div>
                            <div className="submit-button">
                                <input type="submit" value="save" role="button" /><span className="required">* Required</span>
                            </div>
                        </form>  :
                        editPW? null :
                        <div className="button-container">
                            <button type="button" onClick={() => setEditProfile(true)}>edit user data</button>
                        </div>
                            
                    }
                    
                    {editPW ?
                        <form onSubmit={handlePWSubmit} role="form">
                        <div className="button-container">
                            <button type="button" onClick={() => setEditPW(false)}>cancel</button>
                        </div>
                        <div className="grid-container">
                            <label htmlFor="pw">
                                <span className="required">*</span>password
                                <input type="password" id="pw" placeholder="At least 8 signs long" value={pw} onChange={handleFormInput} />
                            </label>
                        </div>
                        <div className="submit-button">
                            <input type="submit" value="save" role="button" /><span className="required">* Required</span>
                        </div>
                        </form>  :
                        editProfile? null :
                        <div className="button-container">
                            <button type="button" onClick={() => setEditPW(true)}>change password</button>
                        </div>
}
                </div>
            </div>
        </div>
    )
}
