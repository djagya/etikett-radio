import React from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
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

function App() {




  return (
    <BrowserRouter>
      <div className="App">
        <div className="stream-page">
          <header className="App-header">
            <nav>
              <NavLink className="nav-link" to="/">home.</NavLink>
              <NavLink className="nav-link" to="/schedule">schedule.</NavLink>
              <NavLink className="nav-link" to="/archive">archive.</NavLink>
              <NavLink className="nav-link" to="/blog">blog.</NavLink>
              <NavLink className="nav-link" to="/hosts">hosts.</NavLink>
              <NavLink className="nav-link" to="/user">staff only.</NavLink>
            </nav>
          </header>
          
          {/* <div className="twitch">
            <h1>etikett<br/>~radio</h1>
            <p>twitch stream window</p>
          </div>
          <div className="info-bar">
            <h2> >>|| player controls and info bar</h2>
          </div> */}
        </div>
        
        
        <Switch>
        {/* User Related */}
        <Route exact path="/user" component={AccountManager} />
        <Route exact path="/user/login" component={LogIn} />
        <Route exact path="/user/createuser" component={CreateUser} />
        {/* Archive Related */}
        <Route exact path="/archive" component={ArchiveList} />
        <Route exact path="/archive/:id" component={ArchiveDetail} />
        <Route exact path="/:id/edit" component={ArchiveEdit} />
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
