import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { NAVBAR_MENU_ITEMS } from "../config";

export default function ResponsiveNavbar() {
  const [isChecked, setIsChecked] = useState(false);
  const logoCatalyst = `${process.env.PUBLIC_URL}/assets/images/Icon_neg@2x.png`;

  return (
    <header className="nav-app-header">
      <a
        href="https://catalyst-berlin.com/"
        title="Catalyst"
        target="_blank"
        rel="noopener noreferrer">
        <img
          src={logoCatalyst}
          alt="Broadcasting live 24/7 from Funkhaus, Berlin.."
        />
      </a>

      <Link to="/about" id="page-title-link">
        <span className="page-title-mobile">etikett~radio</span>
      </Link>

      <nav role="navigation" className="mobile-menu">
        <input
          type="checkbox"
          id="checkbox"
          className="mobile-menu__checkbox"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <label htmlFor="checkbox" className="mobile-menu__btn">
          <div className="mobile-menu__icon"></div>
        </label>

        <div className="mobile-menu__container">
          {NAVBAR_MENU_ITEMS.map((item) => (
            <NavLink
              className="mobile-menu__list"
              to={item.href}
              onClick={() => setIsChecked(!isChecked)}>
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
