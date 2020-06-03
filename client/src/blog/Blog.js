import React, { useState, useEffect } from 'react';
import BlogInputForm from './BlogInputForm';
import BlogEntry from './BlogEntry';

export default function Blog() {
    const [blogData, setBlogData] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3000/blog")
            .then(res => res.json())
            .then(data => setBlogData(data.blog)) 
    }, [])
    //list item construction
    const renderLi = (blogData) => {
        if (blogData.status === 404) return (<h2>Error 404, something went wrong</h2>)
        if (blogData.length === 0) return null; 
        const reversedData = blogData.reverse();
        return reversedData.map((el, i) => (
            
            <BlogEntry el={el} key={i} i={i} data={blogData}/>
            
        ));
    };

    const handleAdd = boolean => {
        setShowForm(boolean)
    };
    
    
    

   
        
    
        return (

            <div className="blog-page not-stream-component">
                <div className="blog-content">
                    <h2>blog</h2>
                    <div className="button-container">
                    {showForm ? 
                    <button type="button" onClick={() => handleAdd(false)}>cancel</button>:
                    <button type="button" onClick={() => handleAdd(true)}>add to blog</button> 
                    }
                    </div>
                    {showForm ? <BlogInputForm /> : null}
                    <ul>
                        {renderLi(blogData)}
                    </ul>
                </div>
            </div>
        );
    
}
