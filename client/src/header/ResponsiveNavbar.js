import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';




export default function ResponsiveNavbar() {
    const [isChecked, setIsChecked] = useState(false);

    return (

        <header className="App-header">

            <Link to="/about" id="page-title-link"> <span className="page-title-mobile">etikett~radio</span></Link>

            <nav role="navigation" className="mobile-menu">

                <input type="checkbox" id="checkbox" className="mobile-menu__checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                <label htmlFor="checkbox" className="mobile-menu__btn"><div className="mobile-menu__icon"></div></label>

                <div className="mobile-menu__container">


                    <NavLink className="mobile-menu__list" to="/schedule" onClick={() => setIsChecked(!isChecked)}>schedule.</NavLink>
                    <NavLink className="mobile-menu__list" to="/archive" onClick={() => setIsChecked(!isChecked)}>archive.</NavLink>
                    <NavLink className="mobile-menu__list" to="/blog" onClick={() => setIsChecked(!isChecked)}>blog.</NavLink>
                    <NavLink className="mobile-menu__list" to="/hosts" onClick={() => setIsChecked(!isChecked)}>hosts.</NavLink>
                    <NavLink className="mobile-menu__list" to="/contact" onClick={() => setIsChecked(!isChecked)}>contact.</NavLink>
                    <NavLink className="mobile-menu__list" to="/login" onClick={() => setIsChecked(!isChecked)}>staff only.</NavLink>

                </div>
            </nav>
        </header >
    )
}
