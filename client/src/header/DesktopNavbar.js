import React from 'react';
import { NavLink } from 'react-router-dom';

export default function DesktopNavbar() {
  return (
    <nav role="navigation">
      <NavLink activeClassName="active-nav" className="nav-link" exact={true} to="/">home.</NavLink>
      <NavLink activeClassName="active-nav" className="nav-link" to="/schedule">schedule.</NavLink>
      <NavLink activeClassName="active-nav" className="nav-link" to="/archive">archive.</NavLink>
      <NavLink activeClassName="active-nav" className="nav-link" to="/blog">blog.</NavLink>
      <NavLink activeClassName="active-nav" className="nav-link" to="/shows">shows.</NavLink>
      <NavLink activeClassName="active-nav" className="nav-link" to="/contact">contact.</NavLink>
      <NavLink activeClassName="active-nav" className="nav-link" to="/login">staff only.</NavLink>
    </nav>
  )
}
