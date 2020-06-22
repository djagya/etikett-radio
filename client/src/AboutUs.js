import React, {  useContext } from 'react'
import {Context} from "./Context";

export default function AboutUs() {
    const context = useContext(Context);
    return (
        <div className={`${context.gapClass}`} >
        
            <h2>Some Bout Us Text in the future</h2>
            <div className="button-container">
                <button type="button" onClick={() => context.setShowAbout(false)}>cancel</button>
            </div>
        </div>
    )
}
