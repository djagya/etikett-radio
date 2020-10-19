import React, { useEffect, useState } from "react";
import moment from "moment";


export default function App() {
    const [hundreths, setHundreths] = useState(0);
    const [sec, setSec] = useState(0);
    const [currMin, setCurrMin] = useState(0);
    const [hour12, setHour12] = useState(0);
    const [hour24, setHour24] = useState(0)
    const timer = () => {
        setHundreths(parseInt(moment().format("SS")))
        setSec(parseInt(moment().format("ss")))
        setCurrMin(parseInt(moment().format("mm")))
        setHour12(parseInt(moment().format("h")))
        setHour24(parseInt(moment().format("H")))
    };
    const baseTime = parseFloat((sec + hundreths / 100).toFixed(2));
    const secIndicator = baseTime * 6;
    const hourIndicator = (currMin + 100/360*secIndicator/100) * 6;
    const hour12Indicator = (hour12 + 100/360*hourIndicator/100) * 30;
    const hour24Indicator = (hour24 + 100/360*hourIndicator/100) * 15;
    useEffect (()=> {
        const setTimer = setInterval(timer, 1000 / 30); // updates time with 30 fps
        return () => clearInterval(setTimer);
    })
    return (

        <SolarSystem>
            <Sun />
            <Planet name="mercury" distanceFromSun="30" time={secIndicator} />
            <Planet name="venus" distanceFromSun="40" time={hourIndicator} />
            <Planet name="earth" distanceFromSun="50" time={hour12Indicator} />
            <Planet name="mars" distanceFromSun="60" time={hour24Indicator} />
        </SolarSystem>

    );
}

const SolarSystem = props => {
    return <div className="solar-system">{props.children}</div>;
};

const Sun = () => {
    return (
        <div className="sun" aria-label="The logo of etikett~radio as a symbol of the sun.">
        </div>
    );
};

const Planet = ({ name, distanceFromSun, time }) => {
    const distancePct = distanceFromSun;
    const orbit = {
        width: `${distancePct}%`,
        height: `${distancePct}%`,
        transform: `rotate(${time}deg)`
        // animationDuration: `${duration}s`
    };

    return (
        <div className="orbit" style={orbit}>
            <div className={"planet " + name} />
        </div>
    );
};
