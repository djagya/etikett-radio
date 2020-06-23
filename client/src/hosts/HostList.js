import React, { useState, useEffect, useContext } from 'react'
import { Context } from "../Context";

export default function HostList() {
    const context = useContext(Context);
    return (
        <div className={` all-list ${context.gapClass}`}>
            <h2>Host List</h2>
        </div>
    )
}
