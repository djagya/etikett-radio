import React, {useState, useContext} from 'react';
import './App.scss';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';

//Page General Related
import Error from "./Error404";
//User Account Related
import AccountManager from "./user/AccountManager";
import LogIn from './user/LogIn';
import CreateUser from './user/CreateUser';
//Archive Related
import ArchiveList from "./radio-archive/ArchiveList";
import ArchiveDetail from './radio-archive/ArchivedShowDetail';
import ArchiveEdit from './radio-archive/ArchiveEditForm';

import VideoStream from './VideoStream';
import Blog from './blog/Blog';
import Home from './Home';

import Noisy from './noise/Noisy'

import Schedule from './schedule/Schedule';
import Contact from './Contact';
import StaffOnly from './user/StaffOnly';
import EditMyProfile from './user/EditMyProfile';
import Hosts from './Carousel-Blog/Hosts';
import { Context } from './Context';




function App(props) {

  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  /////for context/////
  let id = "";
  let [showProfileEdit, setShowProfileEdit] = useState(false)
  if (cookies.user) {
    id = cookies.user._id
  }
/////////////////////////
  return (
    <BrowserRouter>
    <Context.Provider value={{id,showProfileEdit,setShowProfileEdit}}>
      <div className="App">
        <div className="noise" >
          <Noisy />
        </div>
        <div className="stream-page">
          <VideoStream />
        </div>
        <Switch>

          {/*Placeholder for / route so we don't land on Error component*/}
          <Route exact path="/" component={Home} />

          {/* User Related */}
          <Route exact path="/login" render={(props) => <LogIn {...props} setCookie={setCookie} cookies={cookies} />} />
          <Route exact path="/user/createuser" render={(props) => <CreateUser {...props} setCookie={setCookie} cookies={cookies} />} />
          <Route exact path="/user/:id" render={(props) => <StaffOnly {...props} removeCookie={removeCookie}  cookies={cookies} />} />
          <Route exact path="/user/:id/edit" render={(props)=> <EditMyProfile cookies={cookies} setCookie={setCookie} />} />
          <Route exact path="/contact" component={Contact} />

          {/* Archive Related */}
          <Route exact path="/archive" render={(props) => <ArchiveList {...props} cookies={cookies} />} />
          <Route exact path="/archive/:id" component={ArchiveDetail} />
          <Route exact path="/:id/edit" component={ArchiveEdit} />

          {/* Blog Related */}
          <Route exact path="/blog" render={(props) => <Blog {...props} cookies={cookies} />} />

          {/* Hosts Related */}
          <Route exact path="/hosts" render={(props) => <Hosts />} />

          {/* Schedule Related */}
          <Route exact path="/schedule" render={(props) => <Schedule {...props} cookies={cookies} />} />

          {/* Fallback to Error Page */}
          <Route component={Error} />

        </Switch>

        <footer>
        </footer>
      </div>
      </Context.Provider>
    </BrowserRouter>
  );
}

export default App;
