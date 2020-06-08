import React from 'react';
import ReactDOM from 'react-dom';
import Noisy from "./noise/Noisy";
// import './index.css';
import App from './App';
import { CookiesProvider } from 'react-cookie';


ReactDOM.render(<CookiesProvider><Noisy><App /></Noisy></CookiesProvider>, document.getElementById('root'));


