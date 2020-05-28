import React, { useState, useEffect } from 'react';

export default function MusicEdit(props) {

    const [archiveData, setArchiveData] = useState({})
    const id = props.match.params.id
    const [host, setHost] = useState("");
    const [show, setShow] = useState("");
    const [genre, setGenre] = useState("");
    const [date, setDate] = useState("");
    const [link, setLink] = useState("");


    //Get archive by id to pre-fill the form
    useEffect(() => {
        fetch(`http://localhost:3000/archive/${id}`)
            .then(res => res.json())
            .then(data => {
                setArchiveData(data.archive);
                setHost(data.archive.host);
                setShow(data.archive.show);
                setGenre(data.archive.genre);
                setDate(data.archive.date);
                setLink(data.archive.link);
            })
    }, [])

    const handleSubmit = event => {
        event.preventDefault()
        //POST request
        const body = {
            "host": host,
            "show": show,
            "genre": genre,
            "date": date,
            "link": link
        };
        //Put request
        const putData = async (url, data) => {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWNmODU2MzZiMzg2ZTFkYmM3MjNkMDEiLCJpYXQiOjE1OTA2NTg0MDN9.3EV5TvniP9UCJ1eOZ3ebnrZmH39YWp3PGYSWTAMegro"
                },
                body: JSON.stringify(data)
            })
            return response.json()
        }
        putData(`http://localhost:3000/archive/${id}`, body)
            .then(data => { if (!data.success) { console.log(data) } })
            .then(redirect())

    }

    const redirect = () => {
        console.log("update done")
        props.history.push(`/archive/${id}`)
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
            <h2>This is Archive Edit</h2>
            <form className="post-archive" onSubmit={handleSubmit}>
                <div className="grid-container">
                    <label htmlFor="show">
                        <span className="required">*</span>Show
                        <input type="text" id="show" placeholder="Show" value={show} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="host">
                        <span className="required">*</span>Host
                        <input type="text" id="host" placeholder="Host" value={host} onChange={handleFormInput} />
                    </label>
                    
                    <label htmlFor="genre">
                        <span className="required">*</span>Genre
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
                    {/* <label htmlFor="img">
                        Image Link
                    <input type="text" id="img" placeholder="Link to artwork" value={img} onChange={handleFormInput} />
                    </label> */}
                </div>
                <div className="submit-button">
                    <input type="submit" value="Update" /><span className="required">* Required</span>
                </div>
            </form>
        </div>
    )
}
