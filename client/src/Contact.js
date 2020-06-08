import React, {useState} from 'react'

export default function Contact() {

    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    return (
        <div className="not-stream-component">
            <h1>Contact</h1>
            <form>
                <label htmlFor="name">
                    <span className="required">*</span>name
                <input type="text" id="name" placeholder="Name" value={name} />
                </label>
                <label htmlFor="subject">
                    <span className="required">*</span>subject
                <input type="text" id="subject" placeholder="Subject" value={subject} />
                </label>
                <label htmlFor="message">
                    <span className="required">*</span>message
                <input type="textarea" id="message" placeholder="Message" value={message} />
                </label>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}
