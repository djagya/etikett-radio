import React, {useState} from 'react'

export default function Contact() {

    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
    }

    return (
        <div className="not-stream-component">
            <h1>Contact</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    <span className="required">*</span>name
                <input type="text" id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                </label>
                <label htmlFor="subject">
                    <span className="required">*</span>subject
                <input type="text" id="subject" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                </label>
                <label htmlFor="message">
                    <span className="required">*</span>message
                <input type="textarea" id="message" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
                </label>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}
