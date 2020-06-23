import React, { useState, useEffect, useContext } from 'react';
import BlogInputForm from './BlogInputForm';
import BlogEntry from './BlogEntry';
import { useAlert } from 'react-alert';
import DocumentTitle from 'react-document-title';
import { Context } from "../Context";
import { contextsKey } from 'express-validator/src/base';

export default function Blog(props) {
    const context = useContext(Context)
    const [blogData, setBlogData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const alert = useAlert();

    useEffect(() => {
        fetch("/blog")
            .then(res => res.json())
            .then(data => setBlogData(data.blog.reverse()))
            .catch(err => {
                console.log('Error fetching data: ', err)
                alert.error("Failed to fetch data, please contact an admin.")
            })
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
        <DocumentTitle title="Blog">
            <Context.Provider value={{ blogData, setBlogData }}>
                <div className={`${context.gapClass} blog-page`}>
                    <div className="blog-content">
                        <h2 id="main">blog.</h2>
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
