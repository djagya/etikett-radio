import React, { useState, useEffect, useContext } from 'react'
import { useAlert } from 'react-alert';
import { Context } from "../Context";
import { Redirect, Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import PostData from "../PostData";
import PutData from "../PutData";
import GetData from "../GetData";
import Delete from "../Delete";


export default function EditHostPage(props) {
    const context = useContext(Context);

    const [profileExists, setProfileExists] = useState(false)

    const id = context.editHostID;
    const role = props.cookies.user.role
    const [done, setDone] = useState(false)
    const [userID, setUserID] = useState("")
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
    const [profileID, setProfileID] = useState("");
    const [isActive, setIsActive] = useState("active");
    const alert = useAlert();
    useEffect(() => {
        GetData("/host")
            .then(data => {
                if (!data.success) alert.error("Failed to fetch data, please contact the admin.");

                if (data.status === 403) {
                    alert.error("Status 403: Forbidden")
                    return
                }
                if (!data.success) {
                    alert.error("Failed to fetch data, please contact the admin")
                    return
                };
                const filteredData = (data.host.filter(el => el.userID === id))
                if (filteredData.length === 0) return
                if (filteredData.length > 1) {
                    alert.error("It looks like there are more than 1 host profiles with the same ID, please contact the admin.")
                    return <Redirect to={`/user/${context.id}`} />
                }
                if (filteredData.length !== 1 && role !== "Admin") {
                    alert.error("Please contact the owner or the admin to edit this host profile")
                    return <Redirect to={`/user/${context.id}`} />
                }
                if (filteredData.length === 1 || role === "Admin") {
                    setProfileExists(true)
                    setUserID(filteredData[0].userID)
                    setHostName(filteredData[0].hostName)
                    setHostImg(filteredData[0].hostImg)
                    setDescription(filteredData[0].description)
                    setYoutube(filteredData[0].youtube)
                    setSoundcloud(filteredData[0].soundcloud)
                    setMixcloud(filteredData[0].mixcloud)
                    setFacebook(filteredData[0].facebook)
                    setInstagram(filteredData[0].instagram)
                    setTwitter(filteredData[0].twitter)
                    setSnapchat(filteredData[0].snapchat)
                    setOtherName(filteredData[0].otherName)
                    setOtherLink(filteredData[0].otherLink)
                    setProfileID(filteredData[0]._id)
                    setIsActive(filteredData[0].isActive)
                } else {
                    return alert.error("Something went wrong")
                }
            })
    }, [alert, context.id, id, role])

    const handleSubmit = event => {
        event.preventDefault()
        const body = {
            "userID": id,
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
            "isActive": isActive
        };

        if (!profileExists) {
            PostData("/host/createhost", body)
                .then(data => {
                    if (!data.success) {
                        console.log(data)
                        alert.error("Something went wrong while uploading your data for the first time.")
                    } else {
                        alert.success("You successfully initialized your host profile!", { timeout: 3000 })
                        setDone(true)
                    }
                })
        } else {
            PutData(`/host/${profileID}`, body)
                .then(data => {
                    if (!data.success) {
                        console.log(data)
                        alert.error("Something went wrong while updating your data")
                    } else {
                        alert.success("Update successful!", { timeout: 3000 })
                        setDone(true)
                    }
                })
        }
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
            case "isActive":
                setIsActive(input)
                break;
            default: console.log("Edit Input in EditHostPage.js ran through without effect")
        }
    };

    const handleDelete = (id, hostName) => {

        const check = window.confirm(`Are you sure you want to delete "${hostName}"?`);

        if (check) {
            //delete from db
            Delete([id], "host")
            context.setEditHost(false)
        } else {
            return null
        }
    }

    if (done) {
        if (context.id !== userID) {
        return <Redirect to={`/user/hosts/all`}/>
        } else {
        return <Redirect to={`/user/${context.id}`}/>
        }
    }
 
    

    return (
        <DocumentTitle title="Edit host profile">
            <div className={`${context.gapClass} edit-host-page`}>
                {context.id !== userID ? 
                <h1>edit {hostName}s host profile.</h1>:
                <h1>edit my host profile.</h1>
                }
                
                <form className="input-form" onSubmit={handleSubmit}>
                    <div className="button-container">
                    {context.id !== userID ? 
                        <Link className="link-button" to={`/user/hosts/all`}><button type="button">back</button></Link>
                        :<Link className="link-button" to={`/user/${context.id}`}><button type="button">back</button></Link>
                        
                    }
                    {props.cookies.user.role === 'Admin' ?
                        <button type="button" onClick={() => handleDelete(profileID, hostName)}>delete</button>
                    : null}
                    </div>
                    <div className="grid-container">
                        <label htmlFor="hostName">
                            <span className="required">*</span>host name
                            <input type="text" id="hostName" placeholder="host or show name" value={hostName} onChange={handleFormInput} />
                        </label>
                        <label htmlFor="hostImg">
                            <span className="required">*</span>artwork link (please keep it 500x500)
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
                        <label htmlFor="isActive">
                            <span className="required">*</span>Active Host
                        <select id="isActive" value={isActive} onChange={handleFormInput}>
                                <option>active</option>
                                <option>inactive</option>
                            </select>
                        </label>
                    </div>
                    <div className="submit-button">
                        <input type="submit" value="save" /><span className="required">* required</span>
                    </div>
                </form>

            </div>
        </DocumentTitle>
    )
}
