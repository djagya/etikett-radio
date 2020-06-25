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
  width: '300px',
  height: "70px",
  border: "1px solid #467883",
  boxSizing: 'border-box',
  // boxShadow: '0 14px 28px rgba(255, 255, 255, 0.25)'

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


