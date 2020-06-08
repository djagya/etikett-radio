import React, {useState} from 'react'

export default function UserProfile(props) {
    
    const [showEdit, setShowEdit] =useState(false);
    const user = props.cookies.user
    const id= user._id
    
    const handleLogOut = () => {
        props.removeCookie('user', {path: "/"});
        props.removeCookie('x-auth', {path: "/"});
        window.location.assign(`/user/login`)
    };
    return (
        <div className="not-stream-component">
            <h2>Wassuuuuuuuup {user.firstName} </h2>
            {showEdit ? 
                <button type="button" onClick={() => setShowEdit(false)}>cancel</button>:
                <button type="button" onClick={() => setShowEdit(true)}>edit profile</button> 
            }
            {showEdit ? 
                <p>Edit your profile here</p>:
                null
            }
            <button onClick={()=> console.log(user)}>Console.log</button>
            {/* {user ? */}
                <button onClick={handleLogOut}>Log Out</button>
            {/* : null } */}
            
        </div>
    )
}
