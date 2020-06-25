import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
// import AlertTemplate from 'react-alert-template-basic';

const options = {
  position: positions.MIDDLE,
  timeout: 0,
  offset: '0',
  transition: transitions.SCALE,
}
const alertStyle = {
  backgroundColor: '#010508',
  color: '#fff',
  fontSize: '16px',
  padding: '18px',
  textTransform: 'lowercase',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '300px',
  height: "auto",
  border: "1px solid #467883",
  boxSizing: 'border-box',
  borderRadius: "2px"

}
const buttonStyle = {
  marginLeft: '25px',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  color: '#010508'
}
const AlertTemplate = ({ style, options, message, close }) => (
  <div style={{ ...alertStyle, ...style }}>
    {options.type === 'info' && ''}
    {options.type === 'success' && ''}
    {options.type === 'error' && ''}
    {message}
    <button onClick={close} style={buttonStyle}><i className="far fa-times-circle"></i></button>
  </div>
)


ReactDOM.render(
  <CookiesProvider>
    <AlertProvider template={AlertTemplate} {...options} >
      <App />
    </AlertProvider>
  </CookiesProvider>
  , document.getElementById('root'));


