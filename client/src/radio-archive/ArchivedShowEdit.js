import React, { useState, useEffect } from 'react';

export default function MusicEdit(props) {

    const [archiveData, setArchiveData] = useState({})
    const id = props.match.params.id
    const [show, setShow] = useState("");
    const [host, setHost] = useState("");
    const [genre, setGenre] = useState("");
    const [date, setDate] = useState("");
    const [link, setLink] = useState("");
    const [description, setDescription] = useState("");


    //Get archive by id to pre-fill the form
    useEffect(() => {
        fetch(`http://localhost:3000/archive/${id}`)
            .then(res => res.json())
            .then(data => {
                setArchiveData(data.archive);
                setShow(data.archive.show);
                setHost(data.archive.host);
                setGenre(data.archive.genre);
                setDate(data.archive.date);
                setLink(data.archive.link);
                setDescription(data.archive.description);
            })
    }, [])

    const handleSubmit = event => {
        event.preventDefault()
        //POST request
        const body = {
            "show": show,
            "host": host,
            "genre": genre,
            "date": date,
            "link": link,
            "description": description
        };
        //Put request
        const putData = async (url, data) => {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
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
    };

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
                case "description":
                setDescription(input)
                break;
            default: console.log("Archive Input HandleFormInput ran through without effect")
        }
    };


    const repetitiveInputFields = () => {
        const fields = ["show", "host", "genre"];
        const value = [show, host, genre]
        return fields.map((field, i) => (
                <label key={i} htmlFor={field}>
                    <span className="required">*</span>{field}
                    <input type="text" id={field} placeholder={field} value={value[i]} onChange={handleFormInput} />
                </label>
            ));
    };

    return (
        <div className="input-form">
            <h2>This is Archive Edit</h2>
            <form className="post-archive" onSubmit={handleSubmit}>
                <div className="grid-container">
                   
                    {repetitiveInputFields()}
                    <label htmlFor="date">
                        <span className="required">*</span>date
                        <input type="date" id="date" placeholder="yyyy-mm-dd" value={date.substring(0, 10)} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="link">
                        <span className="required">*</span>soundcloud/mixcloud
                        <input type="text" id="link" placeholder="Link" value={link} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="description">
                        description
                    <textarea type="text" id="description" placeholder="Describe the show" onChange={handleFormInput} defaultValue= {description}/>
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
