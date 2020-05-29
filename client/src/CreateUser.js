import React, { useState } from 'react'

export default function CreateUser() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [pw, setPW] = useState("");
    const [role, setRole] = useState("User");

    const handleSubmit = event => {
        event.preventDefault()

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
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify(data)
            })
            return response.json()
        }
        postData("http://localhost:3000/users/createuser", body)
            .then(data => { resetForm(data) })


        const resetForm = (data) => {
            if (data.success) {
                setFirstName("");
                setLastName("");
                setUserName("");
                setEmail("");
                setPW("");
                setRole("User");
                alert("You successfully signed up!")
            } else {
                alert("Please fill out all *Required fields and make sure your password is at least 8 signs long.")
            }
            console.log(data)
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


    return (
        <div className="input-form">
            <h2>New User:</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid-container">
                    <label htmlFor="firstName">
                        <span className="required">*</span>First Name
                    <input type="text" id="firstName" placeholder="First Name" value={firstName} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="lastName">
                        <span className="required">*</span>Last Name
                    <input type="text" id="lastName" placeholder="Last Name" value={lastName} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="userName">
                        <span className="required">*</span>User Name
                    <input type="text" id="userName" placeholder="User Name" value={userName} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="email">
                        <span className="required">*</span>Email
                    <input type="text" id="email" placeholder="Email" value={email} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="pw">
                        <span className="required">*</span>Password
                    <input type="text" id="pw" placeholder="At least 8 signs long" value={pw} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="role">
                        <span className="required">*</span>Role
                    <select id="role" value={role} onChange={handleFormInput}>
                        <option>Admin</option>
                        <option>Host</option>
                    </select>
                    </label>


                </div>
                <div className="submit-button">
                    <input type="submit" value="Sign Up" /><span className="required">* Required</span>
                </div>
            </form>
        </div>
    )
}
