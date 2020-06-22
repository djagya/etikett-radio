import React, {  useContext } from 'react'
import {Context} from "./Context";

export default function AboutUs() {
    const context = useContext(Context);
    return (
        <div className={`${context.gapClass} about-us`} >
        
            <h2>About Us Text work in progress</h2>
            <div className="button-container">
                <button type="button" onClick={() => context.setShowAbout(false)}>cancel</button>
            </div>
        </div>
    )
}
