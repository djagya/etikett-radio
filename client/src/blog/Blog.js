import React, { useState, useEffect } from 'react';
import BlogInputForm from './BlogInputForm';
import BlogEntry from './BlogEntry';
import { Context } from "../Context";
import './Blog.scss';
import DocumentTitle from 'react-document-title';

export default function Blog(props) {
    const [blogData, setBlogData] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3000/blog")
            .then(res => res.json())
            .then(data => setBlogData(data.blog.reverse()))
    }, [])
    //list item construction
    const renderLi = (blogData) => {
        if (blogData.status === 404) return (<h2>Error 404, something went wrong</h2>)
        if (blogData.length === 0) return null;

        return blogData.map((el, i) => (

            <BlogEntry el={el} key={i} i={i} />

        ));
    };


    return (
        <DocumentTitle title="Blog page">
            <Context.Provider value={{ blogData, setBlogData }}>
                <div className="blog-page not-stream-component">
                    <div className="blog-content" title="blog content">
                        <h2>blog</h2>

                        {props.cookies.user && props.cookies.user.role === 'Admin' ?
                            <div className="button-container">
                                {showForm ?
                                    <button type="button" onClick={() => setShowForm(false)}>cancel</button> :
                                    <button type="button" onClick={() => setShowForm(true)}>add to blog</button>
                                }
                            </div>
                            : null}

                        {showForm ? <BlogInputForm /> : null}
                        <ul>
                            {renderLi(blogData)}
                        </ul>
                    </div>
                </div>
            </Context.Provider>
        </DocumentTitle>
    );

}
