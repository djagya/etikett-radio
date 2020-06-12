
import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Context } from './Context';


import "./App.scss"


//Page General Related
import Home from './Home';
import Header from './Header';
import Blog from './blog/Blog';
import Contact from './Contact';
import Schedule from './schedule/Schedule';
import Error from "./Error404";
//User Related
import LogIn from './user/LogIn';
import StaffOnly from './user/StaffOnly';
import CreateUser from './user/CreateUser';
import EditMyProfile from './user/EditMyProfile';
import AllUser from './user/AllUser';
//Host Related
import HostCarousel from './hosts/HostCarousel';
import EditHostForm from './hosts/EditHostForm';
//Archive Related
import ArchiveList from "./radio-archive/ArchiveList";
import ArchiveDetail from './radio-archive/ArchivedShowDetail';
import ArchiveEdit from './radio-archive/ArchiveEditForm';
//Style related
import Noisy from './noise/Noisy'
import SolarSystem from './solar-system-logo/SolarSystem';
import footerImg from "./img/footer-img-1920x600.png"
import DocumentTitle from 'react-document-title';






function App(props) {
  const [chatState, setChatState] = useState('chat-homescreen');
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  /////for context/////
  let id = "";
  const [profileEdit, setProfileEdit] = useState(false)
  const [createProfile, setCreateProfile] = useState(false)
  const [allUser, setAllUser] = useState(false)
  const [editHost, setEditHost] = useState(false)
  if (cookies.user) {
    id = cookies.user._id
  }
  //////////////////////

  console.log(allUser)
  return (
    <DocumentTitle title="Homepage, video streaming">
      <BrowserRouter>

        <Context.Provider value={
          {
            id,
            profileEdit, setProfileEdit,
            createProfile, setCreateProfile,
            allUser, setAllUser,
            editHost, setEditHost
          }
        }>
          <div className="App">

            <div className="noise" >
              <Noisy />
            </div>

            <div className="solar-system">
              <SolarSystem />
            </div>

            <div className="stream-page">
              <Header chatState={chatState} setChatState={setChatState} />
            </div>

            <Switch>

              {/*Placeholder for / route so we don't land on Error component*/}
              <Route exact path="/" component={Home} />

              {/* User Related */}
              <Route exact path="/login" render={(props) => <LogIn {...props} setCookie={setCookie} cookies={cookies} />} />
              <Route exact path="/user/all" render={(props) => <AllUser {...props} cookies={cookies} />} />
              <Route exact path="/user/createuser" render={(props) => <CreateUser {...props} setCookie={setCookie} cookies={cookies} />} />
              <Route exact path="/user/:id" render={(props) => <StaffOnly {...props} removeCookie={removeCookie} cookies={cookies} />} />
              <Route exact path="/user/:id/edit" render={(props) => <EditMyProfile cookies={cookies} setCookie={setCookie} />} />
              <Route exact path="/contact" component={Contact} />

              {/* Archive Related */}
              <Route exact path="/archive" render={(props) => <ArchiveList {...props} cookies={cookies} />} />
              <Route exact path="/archive/:id" component={ArchiveDetail} />
              <Route exact path="/:id/edit" component={ArchiveEdit} />

              {/* Hosts Related */}
              <Route exact path="/hosts" render={(props) => <HostCarousel {...props} cookies={cookies} />} />
              <Route exact path="/hosts/:id" render={(props) => <EditHostForm {...props} cookies={cookies} />} />

              {/* Blog Related */}
              <Route exact path="/blog" render={(props) => <Blog {...props} cookies={cookies} />} />

              {/* Schedule Related */}
              <Route exact path="/schedule" render={(props) => <Schedule {...props} cookies={cookies} />} />

              {/* Fallback to Error Page */}
              <Route component={Error} />

            </Switch>

            <footer>
              <img src={footerImg} width="1920" height="600" alt="A photo taken from the moon surface's of the planet Earth."></img>
            </footer>
          </div>
        </Context.Provider>
      </BrowserRouter>
    </DocumentTitle>

  );
}

export default App;
