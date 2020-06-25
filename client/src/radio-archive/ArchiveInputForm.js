import React, { useState, useEffect, Fragment } from 'react';
import { useAlert } from 'react-alert';
import PostData from "../PostData";
import GetData from "../GetData";

export default function ArchiveInputForm() {
    const [hostData, setHostData] = useState([]);
    const [host, setHost] = useState("");
    const [filter, setFilter] = useState("");
    const [show, setShow] = useState("");
    const [genre, setGenre] = useState("");
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
    const [link, setLink] = useState("");
    const [img, setImg] = useState("");
    const [description, setDescription] = useState("");
    const alert = useAlert();

    useEffect(() => {
        GetData("/host")
            .then(data => setHostData(data.host.sort((hostA, hostB) => (hostA.hostName < hostB.hostName) ? -1 : 1)))
    }, [])

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

        // const postData = async (url, data) => {
        //     const response = await fetch(url, {
        //         method: "POST",
        //         credentials: "include",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify(data)
        //     })
        //     return response.json()
        // }
        PostData("/archive/post", body)
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

    const renderHostOptions = () => {
        return hostData.map((host,i) => 
            <Fragment key={i}>
                <option>{host.hostName}</option>
            </Fragment>
        )
    }



    const handleFormInput = event => {
        const id = event.target.id;
        const input = event.target.value;
        switch (id) {
            case "host":
                setHost(input)
                break;
                case "filter":
                    setFilter(input)
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
   
    return (
        <div className="input-form">
            <h2>archive a show.</h2>
            <form className="post-archive" onSubmit={handleSubmit}>
                <div className ="grid-container">
                    <div className="archive-input-left">
                    <label htmlFor="filter">
                        <span className="required">*</span>host
                        <input type="text" id="filter" placeholder="filter" value={filter} onChange={handleFormInput} />
                    </label>
                    <label className="archive-select-container" htmlFor="host">
                        <select id="host" value={host} size="19" onChange={handleFormInput}>
                            {renderHostOptions()}
                        </select>
                    </label>
                    
                    
                    </div>
                    <div className="archive-input-right">
                        <label htmlFor="show">
                            <span className="required">*</span>show
                            <input type="text" id="show" placeholder="show" value={show} onChange={handleFormInput} />
                        </label>
                        <label htmlFor="genre">
                        <span className="required">*</span>genre
                            <input type="text" id="genre" placeholder="genre" value={genre} onChange={handleFormInput} />
                        </label>
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
                    <div className="submit-button describe">
                        <input type="submit" value="save" role="button" /><span className="required">* required</span>
                    </div>
                </div>
            </form>
        </div>
    )
}
