import React, { useState, useEffect, useContext } from 'react';
import { useAlert } from 'react-alert';
import { Context } from "../Context";
import { Link } from 'react-router-dom';
import Delete from "../Delete";

export default function AllUser() {
    const context = useContext(Context);
    const alert = useAlert();

    const [userData, setUserData] = useState([]);
    const [isActive, setIsActive] = useState(0);
    const [lastSort, setLastSort] = useState(0)

    useEffect(() => {

        fetch("/users", {
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 403) {
                    alert("Status 403: Forbidden")
                    return
                }
                if (data.success) {
                    setUserData(data.users.sort((userA, userB) => (userA.firstName < userB.firstName) ? -1 : 1))
                } else {
                    alert("Failed to fetch data, please contact the admin.")
                    return
                }
            })
    }, [alert])

    const sortData = i => {
        switch (i) {
            case 0:
                setIsActive(0)
                if (lastSort !== isActive) {
                    setUserData([...userData].sort((userA, userB) => (userA.firstName < userB.firstName) ? -1 : 1))
                    setLastSort(0)
                } else {
                    setUserData([...userData].sort((userA, userB) => (userA.firstName > userB.firstName) ? -1 : 1))
                    setLastSort(-1)
                }
                break;
            case 1:
                setIsActive(1)
                if (lastSort !== isActive) {
                    setUserData([...userData].sort((userA, userB) => (userA.lastName < userB.lastName) ? -1 : 1))
                    setLastSort(1)
                } else {
                    setUserData([...userData].sort((userA, userB) => (userA.lastName > userB.lastName) ? -1 : 1))
                    setLastSort(-1)
                }
                break;
            case 2:
                setIsActive(2)
                if (lastSort !== isActive) {
                    setUserData([...userData].sort((userA, userB) => (userA.userName < userB.userName) ? -1 : 1))
                    setLastSort(2)
                } else {
                    setUserData([...userData].sort((userA, userB) => (userA.userName > userB.userName) ? -1 : 1))
                    setLastSort(-1)
                }
                break;
            case 3:
                setIsActive(3)
                if (lastSort !== isActive) {
                    setUserData([...userData].sort((userA, userB) => (userA.email < userB.email) ? -1 : 1))
                    setLastSort(3)
                } else {
                    setUserData([...userData].sort((userA, userB) => (userA.email > userB.email) ? -1 : 1))
                    setLastSort(-1)
                }
                break;
            case 4:
                setIsActive(4)
                if (lastSort !== isActive) {
                    setUserData([...userData].sort((userA, userB) => (userA.role < userB.role) ? -1 : 1))
                    setLastSort(4)
                } else {
                    setUserData([...userData].sort((userA, userB) => (userA.role > userB.role) ? -1 : 1))
                    setLastSort(-1)
                }
                break;
            default: console.log("Sort Switch ran without any effect")
        }
    }


    const handleDelete = (id, userName) => {

        const check = window.confirm(`Are you sure you want to delete "${userName}"?`);

        if (check) {
            //filter copy of blog data based on checkedID and set the new state
            let filteredUserData = [...userData].filter(el => el._id !== id);

            setUserData(filteredUserData)

            //delete from db
            Delete([id], "users").then(output => {
                if (output) {
                    alert.success('User successfully deleted.', {
                        onClose: () => { window.location.reload() }
                    })
                } else {
                    alert.error('Failed to delete user, please contact the admin.');
                }
            })
        } else {
            return null
        }
    }



    const renderLi = (userData) => {

        if (userData.status === 403) return (<h2>please log in as admin</h2>)

        //Because first time the code is running, userData will be an empty array
        if (userData.length === 0) return null;
        return userData.map((el, i) => (
            <ol key={i} className="all-data user-list-grid">
                <li>{el.firstName}</li>
                <li>{el.lastName}</li>
                <li>{el.userName}</li>
                <li>{el.email}</li>
                <li>{el.role}</li>
                <li className="button-container"><button type="button" onClick={() => handleDelete(el._id, el.userName)}>delete</button></li>
            </ol>
        ));
    };
    const renderLiHeader = () => {
        const listHeader = ["first name.", "last name.", "user name.", "email.", "role."]

        return listHeader.map((el, i) => (
            <li key={i} ><span onClick={() => sortData(i)} className={`sort ${i === isActive ? "active" : ""} `}>{el}</span></li>

        ))
    }

    return (
        <div className={`${context.gapClass} all-list`}>
            <h2>all users.</h2>
            <div className="list-container">
            <Link className="button-container" to={`/user/${context.id}`}><button type="button">back</button></Link>
                <div>
                    <ul className="list-header user-list-grid">
                        {renderLiHeader()}
                    </ul>
                    {renderLi(userData)}
                </div>
            </div>
        </div>
    )
}
