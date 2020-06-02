import React, { useState, useEffect } from 'react';
import BlogInputForm from './BlogInputForm';
import Delete from "../Delete"

export default function Blog() {
    const [checkedIDs, setCheckedIDs] = useState([]);
    const [blogData, setBlogData] = useState([]);
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        fetch("http://localhost:3000/blog")
            .then(res => res.json())
            .then(data => setBlogData(data.blog))
    }, [])
    //list item construction
    const renderLi = (blogData) => {
        console.log("test")
        if (blogData.status === 404) return (<h2>Error 404, something went wrong</h2>)
        if (blogData.length === 0) return null; 
        return blogData.map((el, i) => (


            <li key={i}>
                <ul className="blog-list">
                    <article>
                        <li><h2>{el.heading}</h2></li>
                        <li>{el.date.substring(0, 10)}</li>
                        <li>{el.text}</li>
                        <li><input className="check-delete" name={el._id} type="checkbox" onChange={handleIDs}></input></li>
                    </article>
                </ul>
            </li>
        ));
    };
    //Add ID's to array which will get passed to Delete by the Delete Checked button
    const handleIDs = (event) => {
        const checked = event.target.checked
        const id = event.target.name
        if (checked) {
            setCheckedIDs([...checkedIDs, id])
        }
        if (!checked) {
            const filteredIDs = checkedIDs.filter(el => el !== id);
            setCheckedIDs(filteredIDs)
        }
    };

    const handleAdd = boolean => {
        setShowForm(boolean)
    };

    const handleDelete = (checkedIDs) => {
        //prevent error when nothing is selected
        if (checkedIDs.length === 0) {
            return
        }

        //filter copy of blog data based on checkedID and set the new state

        let filteredBlogData = [...blogData];
        for (let i = 0; i < checkedIDs.length; i++) {
            filteredBlogData = filteredBlogData.filter(el => el._id !== checkedIDs[i]);
        }
        setBlogData(filteredBlogData)
        //delete from db
        Delete(checkedIDs, "blog")

        //reset Array of checkedID's
        setCheckedIDs([]);
    }
        return (

            <div className="blog-page">
            <div>
                <h2>blog</h2>
                <div className="add-button">
                {showForm ? 
                <button type="button" onClick={() => handleAdd(false)}>cancel</button>:
                <button type="button" onClick={() => handleAdd(true)}>add to blog</button> 
                }
                </div>
                {showForm ? <BlogInputForm /> : null}
                <ul>
                    {renderLi(blogData)}
                </ul>
                <div className="delete-btn">
                    <button type="button" onClick={() => handleDelete(checkedIDs)}>delete checked</button>
                </div>
            </div>
        </div>
        );
    
}
