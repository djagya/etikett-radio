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
const alertStyle = {
  backgroundColor: '#010508',
  color: '#fff',
  padding: '10px',
  textTransform: 'lowercase',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.03)',
  width: '300px',
  border: "1px solid #467883",
  boxSizing: 'border-box'
}
const buttonStyle = {
  marginLeft: '20px',
  border: 'none',
  height: "10px",
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  color: '#fff'
}
const AlertTemplate = ({ style, options, message, close }) => (
  <div style={{ ...alertStyle, ...style }}>
    {options.type === 'info' && '!'}
    {options.type === 'success' && ':)'}
    {options.type === 'error' && ''}
    {message}
    <button onClick={close} style={buttonStyle}>X</button>
  </div>
)


ReactDOM.render(
  <CookiesProvider>
    <AlertProvider template={AlertTemplate} {...options} >
      <App />
    </AlertProvider>
  </CookiesProvider>
  , document.getElementById('root'));


