import React, { useState, useContext } from 'react';
import { Redirect } from "react-router-dom";
import { useAlert } from 'react-alert';
import { Context } from "../Context";

export default function LogIn(props) {
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const context = useContext(Context);
    const alert = useAlert();

    const handleSubmit = event => {
        event.preventDefault()

        //POST request
        const body = {
            "email": email,
            "pw": pw,
        };

        const postData = async (url, data) => {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(data)
            })
            return response.json()
        }

        postData("http://localhost:3000/users/login", body)
            .then(data => {
                if (data.status === 404) return alert.error("Invalid Email") 
                if (data.status === 403) return alert.error("Invalid Password")
                    if (data.success) {
                        props.setCookie('user', data.user, { path: '/' })
                }
            })

    }

    const handleFormInput = event => {
        const id = event.target.id;
        const input = event.target.value;
        switch (id) {
            case "email":
                setEmail(input)
                break;
            case "pw":
                setPw(input)
                break;

            default: console.log("Log In Input from LogIn.js ran through without effect")
        }
    };
    if (props.cookies.user) { return <Redirect to={`/user/${context.id}`} /> }
    return (
        <div className="input-form not-stream-component">
            <h2 id="main">Log In</h2>
            <form onSubmit={handleSubmit} role="form">
                <div className="grid-container">
                    <label htmlFor="email">
                        <span className="required">*</span>email
                    <input type="text" id="email" placeholder="Email" value={email} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="pw">
                        <span className="required">*</span>password
                    <input type="password" id="pw" placeholder="Password" value={pw} onChange={handleFormInput} />
                    </label>
                </div>
                <div className="submit-button">
                    <input type="submit" value="Log In" role="button" /><span className=" required">* required</span>
                </div>
            </form>
        </div>
    )
}
