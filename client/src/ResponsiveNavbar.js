import React from 'react';
import { NavLink } from 'react-router-dom';

export default function ResponsiveNavbar() {
    return (

        <header className="App-header">
            <nav role="navigation" className="mobile-menu">
                <input type="checkbox" id="checkbox" className="mobile-menu__checkbox" />
                <label htmlFor="checkbox" className="mobile-menu__btn"><div className="mobile-menu__icon"></div></label>

                <div className="mobile-menu__container">

                    <NavLink className="mobile-menu__list" to="/" >home.</NavLink>
                    <NavLink className="mobile-menu__list" to="/schedule" >schedule.</NavLink>
                    <NavLink className="mobile-menu__list" to="/archive" >archive.</NavLink>
                    <NavLink className="mobile-menu__list" to="/blog" >blog.</NavLink>
                    <NavLink className="mobile-menu__list" to="/hosts" >hosts.</NavLink>
                    <NavLink className="mobile-menu__list" to="/contact" >contact.</NavLink>
                    <NavLink className="mobile-menu__list" to="/login" >staff only.</NavLink>

                </div>
            </nav>
        </header>
    )
}
