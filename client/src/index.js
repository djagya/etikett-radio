import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
// import AlertTemplate from 'react-alert-template-basic';

const options = {
  position: positions.MIDDLE,
  timeout: 0,
  offset: '-50px',
  transition: transitions.SCALE,
}
const AlertTemplate = ({ style, options, message, close }) => (
  <div style={{ color: "#ff0000", ...style }}>
    {options.type === 'info' && '!'}
    {options.type === 'success' && ':)'}
    {options.type === 'error' && ':('}
    {message}
    <button onClick={close}>X</button>
  </div>
)


ReactDOM.render(
  <CookiesProvider>
    <AlertProvider template={AlertTemplate} {...options} >
      <App />
    </AlertProvider>
  </CookiesProvider>
  , document.getElementById('root'));


