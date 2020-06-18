import React, { useState, useContext } from 'react';
import {Context} from "../Context";
import { useAlert } from 'react-alert';

export default function ArchiveEdit(props) {
    const context = useContext(Context);
    const archive= props.data;
    const id = props.data._id;
    const alert = useAlert();
    const [show, setShow] = useState(archive.show);
    const [host, setHost] = useState(archive.host);
    const [genre, setGenre] = useState(archive.genre);
    const [date, setDate] = useState(archive.date);
    const [link, setLink] = useState(archive.link);
    const [img, setImg] = useState(archive.img);
    const [description, setDescription] = useState(archive.description);


    const handleSubmit = event => {
        event.preventDefault()
        const body = {
            "show": show,
            "host": host,
            "genre": genre,
            "date": date,
            "link": link,
            "img": img,
            "description": description
        };
        //Put request
        const putData = async (url, data) => {
            const response = await fetch(url, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            return response.json()
        }
        putData(`/archive/${id}`, body)
            .then(data => { 
                if (!data.success) { 
                    console.log(data);
                    alert.error('Server is not responding... Please try again later.'); 
                } else {
                    context.setShowEdit(false);
                    alert.success('Your changes have been saved!', { timeout: 3000 } );
                }
            })
    }


    const handleFormInput = event => {
        const id = event.target.id;
        const input = event.target.value;
        console.log(description)
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
            default: console.log("Archive Edit HandleFormInput ran through without effect")
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
        <div>

            <form className="post-archive input-form" onSubmit={handleSubmit}>
                <div className="button-container">
                </div>
                <div className="grid-container">

                    {repetitiveInputFields()}
                    <label htmlFor="date">
                        <span className="required">*</span>date
                        <input type="date" id="date" placeholder="yyyy-mm-dd" value={date.substring(0, 10)} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="link">
                        <span className="required">*</span>soundcloud/mixcloud
                        <input type="url" id="link" placeholder="Link" value={link} onChange={handleFormInput} />
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
                    <input type="submit" value="update" role="button" /><span className="required">* Required</span>
                </div>
            </form>
        </div>
    )
}
