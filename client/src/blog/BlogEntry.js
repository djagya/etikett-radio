import React, { useState, useContext } from 'react';
import Delete from "../Delete";
import BlogEditForm from './BlogEditForm';
import { Context } from "../Context";
import { useCookies } from "react-cookie";
import { useAlert } from 'react-alert';

export default function BlogEntry(el, i) {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const [showEdit, setShowEdit] = useState(false);
    const context = useContext(Context);
    const alert = useAlert();

    const entry = el.el;
    const handleDelete = (id, heading) => {

        const check = window.confirm(`Are you sure you want to delete "${heading}"?`);

        if (check) {
            //filter copy of blog data based on checkedID and set the new state
            let filteredBlogData = [...context.blogData].filter(el => el._id !== id);

            context.setBlogData(filteredBlogData)
            //delete from db
            Delete([id], "blog").then(output => {
                if (output) {
                    alert.success('Blog(s) deleted.', { timeout: 3000 });
                } else {
                    alert.error("Failed to delete data, please contact the admin.");
                }
            })
        } else {
            return null
        }
    }

    return (

        <li key={i} className="blog-list">
            {cookies.user && cookies.user.role === 'Admin' && "Host" ?
                <div className="button-container controls">
                    {showEdit ?
                        <button type="button" onClick={() => setShowEdit(false)}>cancel</button> :
                        <button type="button" onClick={() => setShowEdit(true)}>edit</button>
                    }
                    <button type="button" onClick={() => handleDelete(entry._id, entry.heading)}>delete</button>
                </div>
                : null}
            {showEdit ?
                <BlogEditForm data={el.el} /> :
                <article>
                    <div className="article-header">
                        <h2>{entry.heading}</h2>
                        <div className="blog-date" >{entry.date.substring(0, 10)}</div>
                    </div>
                    <p className="blog-text" >{entry.text}</p>
                </article>
            }
        </li>

    )
}
