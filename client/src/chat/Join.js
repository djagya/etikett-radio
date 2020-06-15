import React, { useState } from 'react';
import { useAlert } from 'react-alert';

export default function Join({setName}) {
  const [nameInput, setNameInput] = useState('');
  const alert = useAlert();

  const handleSubmit = e => {
    e.preventDefault();

    // Prevent user from having the same name as host
    fetch('http://localhost:3000/host')
      .then(res => res.json())
      .then(data => {
        let match = false;

        // Compare user's chatName with hostName
        data.host.map(({hostName}) => {
          if (hostName.trim().toLocaleLowerCase() === nameInput.trim().toLocaleLowerCase()) {
            match = true;
            return match
          }
        })
        // Return result
        return match
      })
      .then((match) => {

        if (!match) {
          // Prevent user from having the same name as a chat user
          fetch('http://localhost:3000/chat')
            .then(res => res.json())
            .then(data => {

              // Compare user's chatName with chatUsers
              data.chatUsers.map(({name}) => {
                if (name === nameInput.trim().toLocaleLowerCase()) {
                  match = true;
                  return match; 
                }
              });
              // Return result
              return match; 
            })
            .then((match) => {

              if (!match) {
                // Add user
                setName(nameInput);
                sessionStorage.setItem('name', nameInput);      
              } else {
                alert.error('User is already taken.');
                return;
              }
            })  
        } else {
          alert.error('User is already taken.');
          return; 
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
