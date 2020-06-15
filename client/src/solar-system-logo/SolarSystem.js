import React from "react";


export default function App() {
    return (

        <SolarSystem>
            <Sun />
            <Planet name="mercury" distanceFromSun="30" years="0.23" />
            <Planet name="venus" distanceFromSun="40" years="0.5" />
            <Planet name="earth" distanceFromSun="50" years="1" />
            <Planet name="mars" distanceFromSun="60" years="1.5" />
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

const Planet = ({ name, distanceFromSun, years = 1 }) => {
    const distancePct = distanceFromSun;
    const duration = 100 * years;
    const orbit = {
        width: `${distancePct}%`,
        height: `${distancePct}%`,
        animationDuration: `${duration}s`
    };

    return (
        <div className="orbit" style={orbit}>
            <div className={"planet " + name} />
        </div>
    );
};
