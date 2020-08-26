import React from 'react';
import { Link } from 'react-router-dom';




export default function Home() {

    return (
        <div>

            <Link className="about-us-button" to={"/about"}>
                <div className="about-us-cover">about</div>
                <div  className="etikett-black"></div>
            </Link>
                
            



        </div>
    )
}
