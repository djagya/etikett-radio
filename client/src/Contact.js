import React, {useState} from 'react'
import noisyEtikettRadioLogo from './solar-system-logo/imageonline-co-noise.png';

export default function Contact() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    
    const handleSubmit = e => {
        e.preventDefault();        

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify({name, email, subject, message})
        }

        fetch('http://localhost:3000/users/contact', options)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert('Your message has been sent!');
                    setName('');
                    setEmail('');
                    setSubject('');
                    setMessage('');
                } else {
                    alert('Opps! Something went wrong...');
                }
            })
    }

    return (
        <div className="not-stream-component input-form">
            {loading ? <div className="loading"><img src={noisyEtikettRadioLogo} alt="logo loading spinner"/></div> : null }
            <h1>contact</h1>
            <form onSubmit={handleSubmit}>
                <div className="grid-container">
                    <label htmlFor="name">
                        <span className="required">*</span>name
                    <input required type="text" id="name" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
                    </label>
                    <label htmlFor="email">
                        <span className="required">*</span>email
                    <input required type="email" id="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </label>
                    <label htmlFor="subject">
                        <span className="required">*</span>subject
                    <input required type="text" id="subject" placeholder="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                    </label>
                    <label className="describe" htmlFor="message">
                        <span className="required">*</span>message
                    <textarea required type="text" id="message" placeholder="Hey, whats up?" value={message} onChange={(e) => setMessage(e.target.value)} />
                    </label>
                </div>    
                <div className="submit-button">
                    <input type="submit" value="Send" /><span className="required">* required</span>
                </div>
            </form>
        </div>
    )
}
