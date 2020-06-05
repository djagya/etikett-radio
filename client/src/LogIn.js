import React, { useState } from 'react'

export default function LogIn() {

    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");


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
            .then(data => { resetForm(data) })

    }

    const resetForm = (data) => {
        if (data.success) {
            // window.localStorage.setItem("x-auth", value);
            setEmail("");
            setPw("");
            alert("Log In successful, you might want to redirect your user to the music DB tho")
        }
        if (data.status === 404) alert("Invalid Email")
        if (data.status === 403) alert("Invalid Password")

        else { console.log(data) }
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

    return (
        <div className="input-form not-stream-component">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid-container">
                    <label htmlFor="email">
                        <span className="required">*</span>email
                    <input type="text" id="email" placeholder="Email" value={email} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="pw">
                        <span className="required">*</span>password
                    <input type="text" id="pw" placeholder="Password" value={pw} onChange={handleFormInput} />
                    </label>
                </div>
                <div className="submit-button">
                    <input type="submit" value="Log In" /><span className="required">* required</span>
                </div>
            </form>
        </div>
    )
}
