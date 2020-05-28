import React from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
//Page General Related
import Home from "./Home";
import Error from "./Error404";
//User Account Related
import AccountManager from "./AccountManager";
import LogIn from './LogIn';
import CreateUser from './CreateUser';
//Archive Related
import ArchiveList from "./radio-archive/ArchiveList";
import ArchiveInputForm from './radio-archive/ArchiveInputForm';
import ArchiveDetail from './radio-archive/ArchivedShowDetail';
import ArchiveEdit from './radio-archive/ArchivedShowEdit';

function App() {




  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>etikett radio</h1>
          <nav>
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/archive">Archive</NavLink>
            <NavLink className="nav-link" to="/user">Staff Only</NavLink>
          </nav>
        </header>

      </div>
      <Switch>
        {/* General Page Related */}
        <Route exact path="/" component={Home} />
        {/* User Related */}
        <Route exact path="/user" component={AccountManager} />
        <Route exact path="/user/login" component={LogIn} />
        <Route exact path="/user/createuser" component={CreateUser} />
        {/* Archive Related */}
        <Route exact path="/archive" component={ArchiveList} />
        <Route exact path="/archive/post" component={ArchiveInputForm} />
        <Route exact path="/archive/:id" component={ArchiveDetail} />
        <Route exact path="/:id/edit" component={ArchiveEdit} />
        {/* Fallback to Error Page */}
        <Route component={Error} />
      </Switch>

    </BrowserRouter>
  );
}

export default App;
