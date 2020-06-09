import React, { useState } from 'react'

export default function Join({setName}) {
  const [nameInput, setNameInput] = useState('');

  const handleSubmit = e => {
    sessionStorage.setItem('name', nameInput);
  }

  return (
    <div>
      <h1>Join</h1>
      <form onSubmit={handleSubmit} >
        <input type="text" placeholder="Name" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
        <button type="submit">Join Chat</button>
      </form>
    </div>
  )
}
