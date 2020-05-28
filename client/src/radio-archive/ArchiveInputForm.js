import React, { useState } from 'react'
// const createError = require("http-errors");

export default function ArchiveInputForm() {
    const [host, setHost] = useState("");
    const [show, setShow] = useState("");
    const [genre, setGenre] = useState("");
    const [date, setDate] = useState("");
    const [link, setLink] = useState("");

    const handleSubmit = event => {
        event.preventDefault()

        //POST request
        const body = {
            "host": host,
            "show": show,
            "genre": genre,
            "date": date,
            "link": link,
        };

        const postData = async (url, data) => {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWIwMTkyMjI0MzAzZDJmNTAyM2FiM2EiLCJpYXQiOjE1ODg1OTkwNzR9.u3oGxeRLOMgILOwWG1VsuJWCEAtkz4G1EbYSQgE5ObY"
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
                alert("Item was successfully added to database")
            } else {
                alert(data.err)
            }
            console.log(data)
        }
    }





    const handleFormInput = event => {
        const id = event.target.id;
        const input = event.target.value;
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
            default: console.log("Archive Input HandleFormInput ran through without effect")
        }
    };

    return (
        <div className="input-form">
            <h2>Archive Show</h2>
            <form className="post-archive" onSubmit={handleSubmit}>
                <div className="grid-container">
                    <label htmlFor="host">
                        <span className="required">*</span>Host
                    <input type="text" id="host" placeholder="Host" value={host} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="show">
                        <span className="required">*</span>Show
                    <input type="text" id="show" placeholder="Show" value={show} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="genre">
                        Genre
                    <input type="text" id="genre" placeholder="Genre" value={genre} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="date">
                        <span className="required">*</span>Date
                    <input type="text" id="date" placeholder="yyyy-mm-dd" value={date} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="link">
                        <span className="required">*</span>SoundCloud/MixCloud
                    <input type="text" id="link" placeholder="Link" value={link} onChange={handleFormInput} />
                    </label>
                </div>
                <div className="submit-button">
                    <input type="submit" value="Save" /><span className="required">* Required</span>
                </div>
            </form>
        </div>
    )
}
