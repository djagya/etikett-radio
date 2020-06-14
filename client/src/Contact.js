import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { Redirect } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import noisyEtikettRadioLogo from './img/imageonline-co-noise.png';


export default function Contact() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const alert = useAlert();

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ name, email, subject, message })
        }

        fetch('http://localhost:3000/users/contact', options)
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                if (data.success) {
                    setName('');
                    setEmail('');
                    setSubject('');
                    setMessage('');
                    alert.success('Your message has been sent!', {
                        onClose: () => {
                            setRedirect(true);
                        }
                    });
                } else {
                    alert.error('Opps! Something went wrong...');
                }
            })
    }

    if (redirect) return <Redirect to='/' />

    return (
        <DocumentTitle title="Contact page">
            <div className="not-stream-component input-form">

                <h1 id="main">contact</h1>
                <form onSubmit={handleSubmit} role="contact-form" >
                    <div className="grid-container">
                        <label htmlFor="name">
                            <span className="required">*</span>name
                    <input type="text" id="name" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                        <label htmlFor="email">
                            <span className="required">*</span>email
                    <input type="text" id="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label htmlFor="subject">
                            <span className="required">*</span>subject
                    <input type="text" id="subject" placeholder="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                        </label>
                        <label className="describe" htmlFor="message">
                            <span className="required">*</span>message
                    <textarea type="text" id="message" placeholder="Hey, whats up?" value={message} onChange={(e) => setMessage(e.target.value)} />
                        </label>
                    </div>
                    <div className="submit-button">
                        <input type="submit" value="Send" role='button' /><span className="required">* required</span>
                    </div>
                </form>
            </div>

        </DocumentTitle>

    )
}
