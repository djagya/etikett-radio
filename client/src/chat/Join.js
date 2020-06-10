import React, { useState } from 'react'

export default function Join({setName}) {
  const [nameInput, setNameInput] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setName(nameInput);
    sessionStorage.setItem('name', nameInput);
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
