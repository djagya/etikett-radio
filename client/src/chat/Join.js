import React, { useState } from 'react';
import { useAlert } from 'react-alert';

export default function Join({ setName, setCookie }) {
  const [nameInput, setNameInput] = useState('');
  const alert = useAlert();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent really long names
    if (nameInput.length >= 26) {
      return alert.error(
        "Please pick a nickname that's shorter than 25 characters.",
        { timeout: 5000 },
      );
    }

    // Prevent user from having the same name as host
    fetch('/users')
      .then((res) => res.json())
      .then((data) => {
        if (nameInput === '') {
          alert.error('Please enter a nickname to join the chat!', {
            timeout: 5000,
          });
        }

        // Compare user's chatName with userName
        const foundUserName = data.users.find(({ userName }) => {
          return (
            userName.trim().toLocaleLowerCase() ===
            nameInput.trim().toLocaleLowerCase()
          );
        });

        // Return result
        return foundUserName;
      })
      .then((foundUserName) => {
        if (!foundUserName) {
          // Prevent user from having the same name as a chat user
          fetch('/chat')
            .then((res) => res.json())
            .then((data) => {
              // Compare user's chatName with chatUsers
              const foundChatName = data.chatUsers.find(({ name }) => {
                return name === nameInput.trim().toLocaleLowerCase();
              });

              // Return result
              return foundChatName;
            })
            .then((foundChatName) => {
              if (!foundChatName) {
                // Add user
                setName(nameInput);
                setCookie('name', nameInput, { path: '/' });
              } else {
                alert.error('Username is already taken.');
                return;
              }
            })
            .catch((err) => {
              alert.error(
                'Server is not responding. Please contact the admin.',
              );
            });
        } else {
          alert.error('Username is already taken.');
          return;
        }
      })
      .catch((err) => {
        alert.error('Server is not responding. Please contact the admin.');
      });
  };

  return (
    <div className="Join">
      <form onSubmit={handleSubmit} className="join-form">
        <div className="button-container">
          <input
            type="text"
            placeholder="Enter a nickname to join the chat"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <button className="chat-button" type="submit">
            join
          </button>
        </div>
      </form>
    </div>
  );
}
