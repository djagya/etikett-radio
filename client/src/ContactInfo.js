import React from 'react';
import { Socials } from './components/CatalystSocials';

export default function ContactInfo() {
  return (
    <div>
      <ul className="address-field">
        <li className="li-header">
          <h2>address</h2>
        </li>
        <li>Catalyst Institute for Creative Arts and Technology GmbH</li>
        <li>Funkhaus Berlin</li>
        <li>Nalepastraße 18</li>
        <li>12459 Berlin</li>
        <li className="li-header">
          <h2>telephone</h2>
        </li>
        <li>+49 30 2900 9052</li>
        <li className="li-header">
          <h2>website</h2>
        </li>
        <li><a href="https://catalyst-berlin.com/">catalyst-berlin.com</a></li>
        <li className="li-header">
          <h2>socials</h2>
        </li>
      </ul>
      <Socials />
    </div>
  );
}
