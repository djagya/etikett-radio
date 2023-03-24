import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../Context';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import PutData from '../PutData';

export default function EditInfoBar(props) {
  const context = useContext(Context);
  const alert = useAlert();

  const [currMessage, setCurrMessage] = useState('');

  useEffect(() => {
    setCurrMessage(context.infoBarMessage);
  }, [context.infoBarMessage]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = {
      message: context.infoBarMessage,
    };
    PutData(`/infobar/${context.infoID}`, body).then((data) => {
      if (!data.success) {
        alert.error('Something went wrong while updating your data');
      } else {
        alert.success('Update successful!', { timeout: 3000 });
      }
    });
  };

  const handleFormInput = (event) => {
    const input = event.target.value;
    context.setInfoBarMessage(input);
  };

  return (
    <div className={`${context.gapClass} edit-info-bar-container`}>
      <h1 id="main">info bar</h1>
      <form onSubmit={handleSubmit} className="edit-input-form">
        <Link className="button-container" to={`/user/${context.id}`}>
          <button type="button">back</button>
        </Link>
        <div className="info-bar-input-container">
          <label htmlFor="infobar-message">
            <input
              type="text"
              id="infobar-message"
              placeholder="info bar message"
              value={context.infoBarMessage}
              onChange={handleFormInput}
            />
          </label>
        </div>
        <div className="submit-button">
          <input type="submit" value="save" />
        </div>
      </form>
    </div>
  );
}
