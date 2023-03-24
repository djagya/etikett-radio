import React, { useState, useContext } from 'react';
import { useAlert } from 'react-alert';
import { Context } from '../Context';

export default function BlogInput() {
  const [heading, setHeading] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [text, setText] = useState('');
  const alert = useAlert();
  const [disabled, setDisabled] = useState(false);
  const { blogData, setBlogData, setShowForm } = useContext(Context);

  const handleSubmit = (event) => {
    event.preventDefault();
    setDisabled(true);

    //POST request
    const body = {
      heading: heading,
      date: date,
      text: text,
    };

    const postData = async (url, data) => {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return response.json();
    };
    postData('/blog/post', body).then((data) => {
      resetForm(data);
    });

    const resetForm = (data) => {
      if (data.success) {
        alert.success('Your entry has been posted!', { timeout: 3000 });
        setBlogData([data.blog, ...blogData]);
        setShowForm(false);
      } else {
        alert.error(data.err);
      }
    };
  };
  const handleFormInput = (event) => {
    const id = event.target.id;
    const input = event.target.value;
    switch (id) {
      case 'heading':
        setHeading(input);
        break;
      case 'date':
        setDate(input);
        break;
      case 'text':
        setText(input);
        break;
      default:
        console.log('Archive Input HandleFormInput ran through without effect');
    }
  };

  return (
    <form
      className="post-blog input-form"
      onSubmit={handleSubmit}
      title="blog input form">
      <div className="grid-container">
        <label htmlFor="heading">
          <span className="required">*</span>heading
          <input
            type="heading"
            id="heading"
            placeholder="Heading"
            value={heading}
            onChange={handleFormInput}
          />
        </label>
        <label htmlFor="date">
          <span className="required">*</span>date
          <input
            type="date"
            id="date"
            placeholder="yyyy-mm-dd"
            value={date.substring(0, 10)}
            onChange={handleFormInput}
          />
        </label>

        <label className="describe" htmlFor="text">
          <textarea
            type="text"
            id="text"
            placeholder="Whats new?"
            onChange={handleFormInput}
            defaultValue={text}
          />
        </label>
      </div>
      <div className="submit-button">
        <input type="submit" disabled={disabled} value="save" />
        <span className="required">* required</span>
      </div>
    </form>
  );
}
