import React, { useState, useContext } from 'react';
import { useAlert } from 'react-alert';
import { Context } from '../Context';
import { Link } from 'react-router-dom';

export default function CreateUser(props) {
  const context = useContext(Context);
  const alert = useAlert();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPW] = useState('');
  const [role, setRole] = useState('Host');

  const handleSubmit = (event) => {
    event.preventDefault();
    //POST request
    const body = {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      email: email,
      pw: pw,
      role: role,
    };
    const postData = async (url, data) => {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.json();
    };
    postData('/users/createuser', body).then((data) => {
      resetForm(data);
    });

    const resetForm = (data) => {
      if (data.success) {
        setFirstName('');
        setLastName('');
        setUserName('');
        setEmail('');
        setPW('');
        setRole('Host');
        alert.success('User created', { timeout: 3000 });
      }
      if (data.status === 203) {
        alert.error(
          'Please fill out all *required fields, make sure your password is at least 8 characters long and that you use a valid email.',
        );
        return;
      }
      if (data.err.substring(0, 6) === 'E11000') {
        alert.error('Email address already in use');
      }
    };
  };

  const handleFormInput = (event) => {
    const id = event.target.id;
    const input = event.target.value;
    switch (id) {
      case 'firstName':
        setFirstName(input);
        break;
      case 'lastName':
        setLastName(input);
        break;
      case 'userName':
        setUserName(input);
        break;
      case 'email':
        setEmail(input);
        break;
      case 'pw':
        setPW(input);
        break;
      case 'role':
        setRole(input);
        break;
      default:
        console.log(
          'Sign up Input in SignUp.js ran through without any effect',
        );
    }
  };
  return (
    <div className={`${context.gapClass} create-user-page`}>
      <h1 id="main">create a new user.</h1>
      <form className="input-form" onSubmit={handleSubmit}>
        <Link className="button-container" to={`/user/${context.id}`}>
          <button type="button">back</button>
        </Link>
        <div className="grid-container">
          <label htmlFor="firstName">
            <span className="required">*</span>first name
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={handleFormInput}
            />
          </label>
          <label htmlFor="lastName">
            <span className="required">*</span>last name
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={handleFormInput}
            />
          </label>
          <label htmlFor="userName">
            <span className="required">*</span>user name
            <input
              type="text"
              id="userName"
              placeholder="User Name"
              value={userName}
              onChange={handleFormInput}
            />
          </label>
          <label htmlFor="email">
            <span className="required">*</span>email
            <input
              type="text"
              id="email"
              placeholder="Email"
              value={email}
              onChange={handleFormInput}
            />
          </label>
          <label htmlFor="pw">
            <span className="required">*</span>password
            <input
              type="password"
              id="pw"
              placeholder="At least 8 characters long"
              value={pw}
              onChange={handleFormInput}
            />
          </label>
          <label htmlFor="role">
            <span className="required">*</span>role
            <select id="role" value={role} onChange={handleFormInput}>
              <option>Admin</option>
              <option>Host</option>
            </select>
          </label>
        </div>
        <div className="submit-button">
          <input type="submit" value="create" role="button" />
          <span className=" required">* required</span>
        </div>
      </form>
    </div>
  );
}
