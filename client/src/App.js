import React from 'react';
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

import Noisy from './noise/Noisy';
import ChatApp from './chat/ChatApp';

import Schedule from './schedule/Schedule';
import Contact from './Contact';
import StaffOnly from './user/StaffOnly';
import MyProfile from './user/MyProfile';
import Hosts from './Carousel-Blog/Hosts';




function App(props) {

  const [cookies, setCookie, removeCookie] = useCookies(['user'])


  return (
    <BrowserRouter>

      <div className="App">

        <div className="noise" >
          <Noisy />
        </div>

        

        <div className="stream-page">
          <VideoStream />

          <div className="chat chat-open">
            <ChatApp />
          </div>
        </div>


        <Switch>

          {/*Placeholder for / route so we don't land on Error component*/}
          <Route exact path="/" component={Home} />

          {/* User Related */}
          <Route exact path="/user" render={(props) => <StaffOnly {...props} removeCookie={removeCookie} cookies={cookies} />} />
          <Route exact path="/login" render={(props) => <LogIn {...props} setCookie={setCookie} cookies={cookies} />} />
          <Route exact path="/user/createuser" render={(props) => <CreateUser {...props} setCookie={setCookie} cookies={cookies} />} />
          <Route exact path="/user/:id" render={(props) => <MyProfile {...props}  cookies={cookies} />} />
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

    </BrowserRouter>
  );
}

export default App;
