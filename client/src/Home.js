import React, { Fragment, useState, useContext } from 'react';
import AboutUs from './AboutUs';
import { Context } from "./Context";




export default function Home() {
    const context = useContext(Context);



    return (
        <div>

            {context.showAbout ? <AboutUs /> :
            <div className="about-us-button" onClick={() => context.setShowAbout(true)}>
                <div className="about-us-cover">about<br/> us</div>
                <div  className="etikett-black"></div>
            </div>
                
            }



        </div>
    )
}
