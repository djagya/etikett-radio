import React, { useState } from 'react';
import { useAlert } from 'react-alert';

export default function ArchiveInputForm() {
    const [host, setHost] = useState("");
    const [show, setShow] = useState("");
    const [genre, setGenre] = useState("");
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
    const [link, setLink] = useState("");
    const [img, setImg] = useState("");
    const [description, setDescription] = useState("");
    const alert = useAlert();

    const handleSubmit = event => {
        event.preventDefault()

        //POST request
        const body = {
            "host": host,
            "show": show,
            "genre": genre,
            "date": date,
            "link": link,
            "img": img,
            "description": description,
        };

        const postData = async (url, data) => {
            const response = await fetch(url, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            return response.json()
        }
        postData("http://localhost:3000/archive/post", body)
            .then(data => { reload(data) })

        const reload = (data) => {
            if (data.success) {
                alert.success('Your entry has been posted!', {
                    onClose: () => {
                        window.location.reload()
                    }
                })
            } else {
                alert.error(data.err);
            }
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
            case "img":
                setImg(input)
                break;
            case "description":
                setDescription(input)
                break;
            default: console.log("Archive Input HandleFormInput ran through without effect")
        }
    };
    const repetitiveInputFields = () => {
        const fields = ["show", "host", "genre"];
        const value = [show, host, genre];
        return fields.map((field, i) => (
            <label key={i} htmlFor={field}>
                <span className="required">*</span>{field}
                <input type="text" id={field} placeholder={field} value={value[i]} onChange={handleFormInput} />
            </label>
        ));
    };
    return (
        <div className="input-form">
            <h2>archive a show.</h2>
            <form className="post-archive" onSubmit={handleSubmit}>
                <div className="grid-container">

                    {repetitiveInputFields()}
                    <label htmlFor="date">
                        <span className="required">*</span>date
                    <input type="date" id="date" placeholder="yyyy-mm-dd" value={date} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="link">
                        <span className="required">*</span>soundcloud/mixcloud
                    <input type="url" id="link" placeholder="link" value={link} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="img">
                        <span className="required">*</span>artwork
                    <input type="url" id="img" placeholder="link" value={img} onChange={handleFormInput} />
                    </label>
                    <label className="describe" htmlFor="description">
                        description
                    <textarea type="text" id="description" placeholder="Describe the show (e.g. discussed topics, featured artists, track list etc.)" onChange={handleFormInput} defaultValue={description} />
                    </label>
                </div>
                <div className="submit-button">
                    <input type="submit" value="save" role="button" /><span className="required">* required</span>
                </div>
            </form>
        </div>
    )
}
