import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';

const options = {
  position: positions.MIDDLE,
  timeout: 0,
  offset: '30px',
  transition: transitions.SCALE,
}


ReactDOM.render(
  <CookiesProvider>
    <AlertProvider template={AlertTemplate} {...options} >
      <App />
    </AlertProvider>
  </CookiesProvider>
, document.getElementById('root'));


