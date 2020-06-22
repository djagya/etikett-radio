import React, { useState } from 'react'

export default function HostsList({ sortedData, renderSideList }) {
    const [mobileHostListState, setMobileHostListState] = useState('close');

    const showHideList = () => {
        if (mobileHostListState === 'open') {
            setMobileHostListState('close');
        } else {
            setMobileHostListState('open');
        }
    };

    console.log(sortedData);

    const hostsList = sortedData.map((host, i) => {
        return (
            renderSideList(host, i)
        )
    });

    return (
        <div>
            <button onClick={showHideList} >Show all hosts</button>
            <div className={`mobile-host-list-${mobileHostListState}`}>
                <ul className="hosts-dropdown">
                    {hostsList}
                </ul>
            </div>
        </div>
    )
}
