import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAVBAR_MENU_ITEMS } from "../config";

export default function DesktopNavbar() {
  return (
    <nav role="navigation">
      <NavLink
        activeClassName="active-nav"
        className="nav-link"
        exact={true}
        to="/">
        home.
      </NavLink>

      {NAVBAR_MENU_ITEMS.map((item) => (
        <NavLink
          activeClassName="active-nav"
          className="nav-link"
          to={item.href}>
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
}
