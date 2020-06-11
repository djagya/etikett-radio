import React, { useState, useEffect, useContext } from 'react';
import {Context} from "../Context";
import {Redirect} from 'react-router-dom';
import Delete from "../Delete";

export default function AllUser() {
    const context = useContext(Context)

    const [userData, setUserData] = useState([]);

    let sortedData = userData.sort((userA, userB)=>(userA.firstName < userB.firstName)? -1 : 1)



    useEffect(() => {

        fetch("http://localhost:3000/users", {
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => setUserData(data.users)) 
    }, [])

    const handleDelete = (id, userName) => {

        const check = window.confirm(`You really want to delete "${userName}"?`);

        if (check) {
           //filter copy of blog data based on checkedID and set the new state
            let filteredUserData = [...userData].filter(el => el._id !== id);

            setUserData(filteredUserData)

            //delete from db
            Delete([id], "users")
            } else {
                return null
            }
    }

    if (!context.allUser) {return <Redirect to={`/user/${context.id}`}/>}

    const renderLi = (userData) => {
        
        // Render login and create account links
        if (userData.status === 403) return (<h2>please log in as admin</h2>)

        //Because first time the code is running, userData will be an empty array
        if (userData.length === 0) return null; 
        return userData.map((el, i) => (
            <ul key={i} className="user-data">
                <li>{el.firstName}</li>
                <li>{el.lastName}</li>
                <li>{el.userName}</li>
                <li>{el.email}</li>
                <li>{el.role}</li>
                <li><button type="button" onClick={() => handleDelete(el._id, el.userName)}>delete</button></li>
            </ul>
        ));
    };

    return (
        <div className="not-stream-component user-list">
            <h2>All Users</h2>
            <div className="list-container">
                <div className="button-container">
                    <button type="button" onClick={() => context.setAllUser(false)}>cancel</button>
                </div>
                <div>
                        <ul className="list-header">
                            <li>first name</li>
                            <li>last name</li>
                            <li>user name</li>
                            <li>email</li>
                            <li>role</li>
                        </ul>
                    {renderLi(sortedData)}
                </div>
            </div>
        </div>
    )
}
