import React, { useState, useContext } from 'react';
import { useAlert } from 'react-alert';
import { Context } from "../Context";
import { Redirect } from 'react-router-dom';

export default function CreateUser(props) {
    const context = useContext(Context);
    const alert = useAlert();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [pw, setPW] = useState("");
    const [role, setRole] = useState("Host");

    const handleSubmit = event => {
        event.preventDefault()
        console.log("submit is running")
        //POST request
        const body = {
            "firstName": firstName,
            "lastName": lastName,
            "userName": userName,
            "email": email,
            "pw": pw,
            "role": role
        };
        const postData = async (url, data) => {
            const response = await fetch(url, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            return response.json()
        }
        postData("http://localhost:3000/users/createuser", body)
            .then(data => {
                console.log(data)
                resetForm(data);
            })


        const resetForm = (data) => {
            if (data.success) {
                setFirstName("");
                setLastName("");
                setUserName("");
                setEmail("");
                setPW("");
                setRole("Host");
                alert.success("User created", { timeout: 3000 })
            } else {
                alert.error("Please fill out all *Required fields and make sure your password is at least 8 signs long.")
            }
        }

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

    if (!context.createProfile) { return <Redirect to={`/user/${context.id}`} /> }

    return (
        <div className="not-stream-component create-user-page">
            <h2 id="main">create a new user</h2>
            <form className="input-form" onSubmit={handleSubmit} role="form">
                <div className="button-container">
                    <button type="button" onClick={() => context.setCreateProfile(false)}>cancel</button>
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
                    <label htmlFor="pw">
                        <span className="required">*</span>password
                    <input type="password" id="pw" placeholder="At least 8 signs long" value={pw} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="role">
                        <span className="required">*</span>role
                    <select id="role" value={role} onChange={handleFormInput}>
                            <option>Admin</option>
                            <option>Host</option>
                        </select>
                    </label>


                </div>
                <div className="submit-button">
                    <input type="submit" value="Sign Up" role="button" /><span className=" required">* Required</span>
                </div>
            </form>
        </div>
    )
}
