import React, { Fragment, useState, useContext } from 'react';
import AboutUs from './AboutUs';
import { Context } from "./Context";




export default function Home() {
    const context = useContext(Context);



    return (
        <div>

            {context.showAbout ? <AboutUs /> :
                <div onClick={() => context.setShowAbout(true)} className="etikett-black"></div>
            }



        </div>
    )
}
