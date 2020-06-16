import React, { useState } from 'react';
import { useAlert } from 'react-alert';

export default function Join({ setName, setCookie}) {
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
        data.host.map(({hostName, isActive}) => {
          if (hostName.trim().toLocaleLowerCase() === nameInput.trim().toLocaleLowerCase() && isActive === 'active') {
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
                setCookie('name', nameInput, {path: '/'});      
              } else {
                alert.error('Username is already taken.');
                return;
              }
            })
            .catch(err => {
              console.log(err);
              alert.error('Server is not responding. Please contact an admin.')
            })

        } else {
          alert.error('Username is already taken.');
          return; 
        } 
      })
      .catch(err => {
        console.log(err);
        alert.error('Server is not responding. Please contact an admin.')
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
