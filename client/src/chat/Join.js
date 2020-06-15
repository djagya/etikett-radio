import React, { useState } from 'react';
import { useAlert } from 'react-alert';

export default function Join({setName}) {
  const [nameInput, setNameInput] = useState('');
  const alert = useAlert();

  const handleSubmit = e => {
    e.preventDefault();

    fetch('http://localhost:3000/host')
      .then(res => res.json())
      .then(data => {
        let match = false;
        data.host.map(({hostName}) => {
          if (hostName.trim().toLocaleLowerCase() === nameInput.trim().toLocaleLowerCase()) {
            match = true;
            return alert.error('Username is already taken.');
          }
        })
        return match
      })
      .then((match) => {
        if (!match) {
          setName(nameInput);
          sessionStorage.setItem('name', nameInput);  
        }
      })
  }

  return (
    <div className="Join">
      <h3>Join our chat!</h3>
      <form onSubmit={handleSubmit} className="join-form">
        <input type="text" placeholder="Name" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
        <button type="submit">Join</button>
      </form>
    </div>
  )
}
