import React, { useState, useEffect } from 'react'

export default function MyProfile(props, id) {
    const user = props.props.cookies.user
    // const param = props.match.params.id
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [pw, setPW] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        fetch(`http://localhost:3000/users/${props.id}`, {
            credentials: "include",
            // headers: {"Content-Type": "application/json"}
        })
            .then(res => res.json())
            .then(data => {
                setFirstName(data.user.firstName)
                setLastName(data.user.lastName)
                setUserName(data.user.userName)
                setEmail(data.user.email)
                setPW(data.user.pw)
                setRole(data.user.role)
                console.log(data)
            }) 
    }, [])
    

    const handleSubmit = event => {
        event.preventDefault()
        const body = {
            "firstName": firstName,
            "lastName": lastName,
            "userName": userName,
            "email": email,
            "pw": pw,
            "role": role
        };
        //Put request
        const putData = async (url, data) => {
            const response = await fetch(url, {
                method: "PUT",
                credentials:"include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            return response.json()
        }
        putData(`http://localhost:3000/users/${props.id}`, body)
            .then(data => { if (!data.success) 
                { console.log(data) } else {
                    window.location.assign(`/user`)
                } })
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

    return (
        <div>
                <div className="input-form not-stream-component">
                <h2>my profile</h2>
                <form onSubmit={handleSubmit}>
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
                        <input type="text" id="pw" placeholder="At least 8 signs long" value={pw} onChange={handleFormInput} />
                        </label>
                        {user && user.role === 'Admin' ?
                        <label htmlFor="role">
                            <span className="required">*</span>role
                        <select id="role" value={role} onChange={handleFormInput}>
                            <option>Admin</option>
                            <option>Host</option>
                        </select>
                        </label>
                        : null }
                    </div>
                    <div className="submit-button">
                        <input type="submit" value="Save" /><span className="required">* Required</span>
                    </div>
                </form>
            </div>
            
        </div>
    )
}
