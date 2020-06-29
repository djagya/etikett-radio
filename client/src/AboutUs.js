import React, {  useContext, useState } from 'react'
import {Context} from "./Context";
import { Link } from 'react-router-dom';

export default function AboutUs() {
    const {showAbout, setShowAbout, gapClass} = useContext(Context);
    const [redirect, setRedirect] = useState(false)

   

    return (
        <div className={`${gapClass} about-us`} >
        
            <h2>about us.</h2>
            <Link className="link-component" to={"/"}>back</Link>
            <div className="about-us-content">
                <div className="text">
                <p>Welcome to Catalyst’s student-run radio platform. Whenever we’re sharing sounds by the resident talents of our creative music and film production institute, Etikett Radio is the place to listen.</p>

                <p>Spanning everything from DJ mixes and improvised live performances, to voice acting and film discussions, the <span>etikett-radio.com</span> programme features over 25 shows. Our SoundCloud is a melting pot of trailblazing music and game-changing ideas from Catalyst’s students and tutors. What’s more, we have recently begun live streaming our collaborative parties and educational workshops, taking place in some of Berlin’s most famous venues.</p>

                <p>Etikett Radio was founded in 2014, a year after the launch of Catalyst, which was until July 2020 known as dBs Berlin. Broadcasting daily from our legendary Funkhaus location – once home to the world’s largest radio station – our eclectic roster of student presenters continue the legacy of the renowned artists who have recorded in our unique studios.</p>
                </div>
                
                <div className="about-us-footer">

                </div>
            </div>
            
        </div>
    )
}
