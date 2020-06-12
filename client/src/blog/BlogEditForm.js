import React, {useState} from 'react';
import {useAlert} from 'react-alert'

export default function BlogEditForm(param) {

    const data = param.data
    const [heading, setHeading] = useState(data.heading);
    const [date, setDate] = useState(data.date);
    const [text, setText] = useState(data.text);
    const id = data._id
    const alert = useAlert();
   
    const handleSubmit = event => {
        event.preventDefault()

        //PUT request
        const body = {
            "heading": heading,
            "date": date,
            "text": text,
        };

        const putData = async (url, data) => {
            const response = await fetch(url, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",},
                body: JSON.stringify(data)
            })
            return response.json()
        }
        putData(`http://localhost:3000/blog/${id}`, body)
            .then(data => {  
                if (!data.success) { 
                    console.log(data);
                    alert.error('Oops! The server is not responding... Try again later.');
                } else {
                    alert.success('Your changes have been saved!', {
                        onClose: () => {
                            window.location.reload()
                        }
                    })
                }
            })
            

        
    };
    
    const handleFormInput = event => {
        const id = event.target.id;
        const input = event.target.value;
        switch (id) {
            case "heading":
                setHeading(input)
                break;
            case "date":
                setDate(input)
                break;
            case "text":
                setText(input)
                break;
            default: console.log("BlogEdit ran through without effect")
        }
    };
    
    return (
        <div className="input-form">
        <h2>Edit {data.heading}</h2>
            <form className="post-blog" onSubmit={handleSubmit}>
            <div className="grid-container">
                

                <label htmlFor="heading">
                    <span className="required">*</span>heading
                <input type="heading" id="heading" placeholder="Heading" value={heading} onChange={handleFormInput} />
                </label>
                <label htmlFor="date">
                    <span className="required">*</span>date
                <input type="date" id="date" placeholder="yyyy-mm-dd" value={date.substring(0, 10)} onChange={handleFormInput} />
                </label> 

                <label className="describe" htmlFor="text">
                <textarea type="text" id="text" placeholder="Whats new?" onChange={handleFormInput} defaultValue={text} />
                </label>
            </div>
            <div className="submit-button">
                <input type="submit" value="Save" /><span className="required">* required</span>
            </div>
        </form>

        </div>
    )
}
