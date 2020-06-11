import React, { useState, useEffect, useContext } from 'react'
import {Context} from "../Context";
import {Redirect} from 'react-router-dom';
import PostData from "../PostData";


export default function EditHostPage() {
    const context = useContext(Context);

    const [hostData, setHostData] = useState([]);
    const [profileExists, setProfileExists] = useState(false)

    console.log(hostData)

    const userID = context.id;
    const [hostName, setHostName] = useState("");
    const [hostImg, setHostImg] = useState("");
    const [description, setDescription] = useState("");
    const [youtube, setYoutube] = useState("");
    const [soundcloud, setSoundcloud] = useState("");
    const [mixcloud, setMixcloud] = useState("");
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [twitter, setTwitter] = useState("");
    const [snapchat, setSnapchat] = useState("");
    const [otherName, setOtherName] = useState("");
    const [otherLink, setOtherLink] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/host", {
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => setHostData(data.host)) 
    }, [])


    const handleSubmit = event => {
        event.preventDefault()
        console.log("submit is running")
        //POST request
        const body = {
            "userID": userID,
            "hostImg": hostImg,
            "hostName": hostName,
            "description": description,
            "youtube": youtube,
            "soundcloud": soundcloud,
            "mixcloud": mixcloud,
            "facebook": facebook,
            "instagram": instagram,
            "twitter": twitter,
            "snapchat": snapchat,
            "otherName": otherName,
            "otherLink": otherLink,
        };

        PostData("http://localhost:3000/host/createhost", body)
            .then(data => { 
                console.log(data)
            })

    }
    const handleFormInput = event => {
        const id = event.target.id;
        const input = event.target.value;
        switch (id) {
            case "hostName":
                setHostName(input)
                break;
            case "hostImg":
                setHostImg(input)
                break;
            case "hostDescription":
                setDescription(input)
                break;
            case "youtube":
                setYoutube(input)
                break;
            case "soundcloud":
                setSoundcloud(input)
                break;
            case "mixcloud":
                setMixcloud(input)
                break;
            case "facebook":
                setFacebook(input)
                break;
            case "instagram":
                setInstagram(input)
                break;
            case "twitter":
                setTwitter(input)
                break;
            case "snapchat":
                setSnapchat(input)
                break;
            case "otherName":
                setOtherName(input)
                break;
            case "otherLink":
                setOtherLink(input)
                break;
            default: console.log("Edit Input in EditHostPage.js ran through without effect")
        }
    };

    if (!context.editHost) {return <Redirect to={`/user/${context.id}`}/>}
    return (
        <div className="not-stream-component edit-host-page">
            <h2>edit my host page</h2>
            <form className="post-blog input-form" onSubmit={handleSubmit}>
                <div className="button-container">
                    <button type="button" onClick={() => context.setEditHost(false)}>cancel</button>
                </div>
                <div className="grid-container">
                    <label htmlFor="hostName">
                        <span className="required">*</span>host name
                        <input type="text" id="hostName" placeholder="host or show name" value={hostName} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="hostImg">
                        <span className="required">*</span>link to artwork
                        <input type="url" id="hostImg" placeholder="artwork link" value={hostImg} onChange={handleFormInput} />
                    </label>
                    <label className="describe" htmlFor="hostDescription">
                        <span className="required">*</span>host description
                        <textarea type="text" id="hostDescription" placeholder="about you and the show" onChange={handleFormInput} defaultValue={description} />
                    </label>
                </div>

                <div className="grid-container">
                    <label htmlFor="youtube">
                        youtube
                        <input type="url" id="youtube" placeholder="youtube link" value={youtube} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="soundcloud">
                        soundcloud
                        <input type="url" id="soundcloud" placeholder="soundcloud link" value={soundcloud} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="mixcloud">
                        mixcloud
                        <input type="url" id="mixcloud" placeholder="mixcloud link" value={mixcloud} onChange={handleFormInput} />
                    </label>
                </div>

                <div className="grid-container">
                    <label htmlFor="facebook">
                        facebook
                        <input type="url" id="facebook" placeholder="facebook link" value={facebook} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="instagram">
                        instagram
                        <input type="url" id="instagram" placeholder="instagram link" value={instagram} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="twitter">
                        twitter
                        <input type="url" id="twitter" placeholder="twitter link" value={twitter} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="snapchat">
                        snapchat
                        <input type="url" id="snapchat" placeholder="snapchat link" value={snapchat} onChange={handleFormInput} />
                    </label>
                </div>

                <div className="grid-container">
                    <label htmlFor="otherName">
                        name of your website
                        <input type="text" id="otherName" placeholder="myspace" value={otherName} onChange={handleFormInput} />
                    </label>
                    <label htmlFor="otherLink">
                        link to your website
                        <input type="url" id="otherLink" placeholder="https://myspace.com/roflcopter/imsuchaboomer" value={otherLink} onChange={handleFormInput} />
                    </label>
                </div>
                <div className="submit-button">
                    <input type="submit" value="Save" /><span className="required">* required</span>
                </div>
            </form>

        </div>
    )
}
