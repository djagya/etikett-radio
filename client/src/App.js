import React, { useEffect, useState } from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { useCookies } from 'react-cookie';
//Page General Related
import Error from "./Error404";
//User Account Related
import AccountManager from "./AccountManager";
import LogIn from './LogIn';
import CreateUser from './CreateUser';
//Archive Related
import ArchiveList from "./radio-archive/ArchiveList";
import ArchiveDetail from './radio-archive/ArchivedShowDetail';
import ArchiveEdit from './radio-archive/ArchiveEditForm';
import VideoStream from './VideoStream';
import Blog from './blog/Blog';
import Home from './Home';

function App(props) {

  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  useEffect(() => {
    console.log('[useEffect App]')
    console.log(cookies)
  }, []);

  return (
    <BrowserRouter>
    
      <div className="App">
        <div className="stream-page">
            <VideoStream />  
        </div>
        
        
        <Switch>
          {/*Placeholder for / route so we don't land on Error component*/}
          <Route exact path="/" component={Home}/> 
       
          {/* User Related */}
          <Route exact path="/user" component={AccountManager} />
          <Route exact path="/user/login" render={(props) => <LogIn {...props} setCookie={setCookie} /> } />
          <Route exact path="/user/createuser" component={CreateUser} />
          {/* Archive Related */}
          <Route exact path="/archive" render={(props) => <ArchiveList {...props} cookies={cookies} /> } />
          <Route exact path="/archive/:id" component={ArchiveDetail} />
          <Route exact path="/:id/edit" component={ArchiveEdit} />
          <Route exact path="/blog" component={Blog} />
          {/* Fallback to Error Page */}
          <Route component={Error} />
          
        </Switch>
        
        <footer>
          Footer
        </footer>

      </div>
      
    </BrowserRouter>
  );
}

export default App;
