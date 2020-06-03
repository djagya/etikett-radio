import React, {useState, useContext} from 'react';
import Delete from "../Delete";
import BlogEditForm from './BlogEditForm';
import {Context} from "../Context";

export default function BlogEntry(el, i) {
    const [showEdit, setShowEdit] =useState(false);
    const contextData = useContext(Context)
    console.log(contextData) 
    
    const entry= el.el;
    const handleDelete = (id, heading) => {

        const check = window.confirm(`You really want to delete "${heading}"?`);

        if (check) {
           //filter copy of blog data based on checkedID and set the new state
            let filteredBlogData = [...contextData.blogData].filter(el => el._id !== id);

            contextData.setBlogData(filteredBlogData.reverse())

            //delete from db
            Delete([id], "blog")
            } else {
                return null
            }
    }

    const handleEdit = boolean => {
        setShowEdit(boolean)
    };

    return (
        
        <li key={i} className="blog-list">
            <div className="button-container archive-controls">
                {showEdit ? 
                <button type="button" onClick={() => handleEdit(false)}>cancel</button>:
                <button type="button" onClick={() => handleEdit(true)}>edit</button> 
                }
                <button type="button" onClick={() => handleDelete(entry._id, entry.heading)}>delete</button>
            </div>
            {showEdit?
                <BlogEditForm data={el.el}/>:
                <article>
                <div className="article-header">
                    <h2>{entry.heading}</h2>
                    <p>{entry.date.substring(0, 10)}</p>
                </div>
                <p>{entry.text}</p>
                </article>
                }
        
        </li>
    )
}
