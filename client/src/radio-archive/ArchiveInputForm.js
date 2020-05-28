import React, { useState } from 'react'
// const createError = require("http-errors");

export default function ArchiveInputForm() {
    const [host, setHost] = useState("");
    const [show, setShow] = useState("");
    const [genre, setGenre] = useState("");
    const [date, setDate] = useState("");
    const [link, setLink] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = event => {
        event.preventDefault()

        //POST request
        const body = {
            "host": host,
            "show": show,
            "genre": genre,
            "date": date,
            "link": link,
            "description": description,
        };

        const postData = async (url, data) => {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // "x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWIwMTkyMjI0MzAzZDJmNTAyM2FiM2EiLCJpYXQiOjE1ODg1OTkwNzR9.u3oGxeRLOMgILOwWG1VsuJWCEAtkz4G1EbYSQgE5ObY"
                },
                body: JSON.stringify(data)
            })
            return response.json()
        }
        postData("http://localhost:3000/archive/post", body)
            .then(data => { resetForm(data) })

        const resetForm = (data) => {
            if (data.success) {
                setHost("");
                setShow("");
                setGenre("");
                setDate("");
                setLink("");
                setDescription("");
                window.location.reload()
            } else {
                alert(data.err)
            }
            console.log(data)
        }
    }





    const handleFormInput = event => {
        const id = event.target.id;
        const input = event.target.value;
        console.log(input);
        switch (id) {
            case "host":
                setHost(input)
                break;
            case "show":
                setShow(input)
                break;
            case "genre":
                setGenre(input)
                break;
            case "date":
                setDate(input)
                break;
            case "link":
                setLink(input)
                break;
                case "description":
                setDescription(input)
                break;
            default: console.log("Archive Input HandleFormInput ran through without effect")
        }
    };

    return (
        <div className="input-form">
            <h2>Archive Show</h2>
            <form className="post-archive" onSubmit={handleSubmit}>
                <div className="grid-container">
                    <label htmlFor="host">
                        <span className="required">*</span>host
                    <input type="text" id="host" placeholder="Host" value={host} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="show">
                        <span className="required">*</span>show
                    <input type="text" id="show" placeholder="Show" value={show} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="genre">
                        Genre
                    <input type="text" id="genre" placeholder="Genre" value={genre} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="date">
                        <span className="required">*</span>date
                    <input type="date" id="date" placeholder="yyyy-mm-dd" value={date} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="link">
                        <span className="required">*</span>soundcloud/mixcloud
                    <input type="text" id="link" placeholder="Link" value={link} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="description">
                        description
                    <textarea type="text" id="description" placeholder="Describe the show" onChange={handleFormInput} >{description}</textarea>
                    </label>
                </div>
                <div className="submit-button">
                    <input type="submit" value="Save" /><span className="required">* required</span>
                </div>
            </form>
        </div>
    )
}
