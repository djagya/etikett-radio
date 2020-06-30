import React, { useState, useEffect, useContext, Fragment } from 'react';
import BlogInputForm from './BlogInputForm';
import BlogEntry from './BlogEntry';
import { useAlert } from 'react-alert';
import DocumentTitle from 'react-document-title';
import { Context } from "../Context";
import { contextsKey } from 'express-validator/src/base';
import Null from '../loading/Null';

export default function Blog(props) {
    const context = useContext(Context)
    const [blogData, setBlogData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const alert = useAlert();

    useEffect(() => {
        setLoading(true);
        fetch("/blog")
            .then(res => res.json())
            .then(data => {
                setBlogData(data.blog.reverse());
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log('Error fetching data: ', err)

                alert.error('Failed to fetch blog entries from the server. Please contact the admin.');

            })
    }, [])
    //list item construction
    const renderLi = () => {
        if (blogData.status === 404) return (<h2>Error 404, something went wrong</h2>)
        if (blogData.length === 0) return null;

        return blogData.map((el, i) => (
            <Fragment key={i}>
                <BlogEntry el={el}  i={i} />
            </Fragment>
        ));
    };
    if (loading) return <Null />

    return (
        <DocumentTitle title="Blog">
            <Context.Provider value={{ 
                blogData, setBlogData,
                showForm, setShowForm
                 }}>
                <div className={`${context.gapClass} blog-page`}>
                    <div className="blog-content">
                        <h2 id="main">blog.</h2>
                        {props.cookies.user && props.cookies.user.role === 'Admin' && "Host" ?
                            <div className="button-container">
                                {showForm ?
                                    <button type="button" onClick={() => setShowForm(false)}>cancel</button> :
                                    <button type="button" onClick={() => setShowForm(true)}>add to blog</button>
                                }
                            </div>
                            : null}

                        {showForm ? <BlogInputForm /> : null}
                        <ul>
                            {renderLi()}
                        </ul>
                    </div>
                </div>
            </Context.Provider>
        </DocumentTitle>
    );

}
