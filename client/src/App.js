
import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Context } from './Context';


import "./App.scss"


//Page General Related
import Home from './Home';
import Header from './Header';
import Blog from './blog/Blog';
import EditInfoBar from "./user/EditInfoBar";
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
import AllHosts from './hosts/AllHosts';
//Archive Related
import ArchiveList from "./radio-archive/ArchiveList";
import ArchiveDetail from './radio-archive/ArchivedShowDetail';
import ArchiveEdit from './radio-archive/ArchiveEditForm';
//Style related
import Noisy from './noise/Noisy'
import SolarSystem from './solar-system-logo/SolarSystem';
import footerImg from "./img/footer-img-1920x600.png"
import DocumentTitle from 'react-document-title';
import SkipLink from 'skip-links';




function App(props) {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  /////for context/////
  let id = "";
  const [profileEdit, setProfileEdit] = useState(false);
  const [createProfile, setCreateProfile] = useState(false);
  const [allUser, setAllUser] = useState(false);
  const [editHost, setEditHost] = useState(false);
  const [editHostID, setEditHostID] = useState("");
  const [allHosts, setAllHosts] = useState(false);
  const [editInfoBar, setEditInfoBar] = useState(false);
  const [infoBarMessage, setInfoBarMessage] = useState("");
  const [infoID, setInfoID] = useState("");
  const [gapClass, setGapClass] =useState("big-gap");
  const [pathName, setPathName] =useState("/")
  const [gradient, setGradient] =useState("gradient");
  if (cookies.user) {
    id = cookies.user._id
  }

  const links = [
    { title: "Skip to main content", to: 'main' },
    { title: 'Skip to footer', to: 'footer' }
  ]
  //////////////////////

  return (
    <DocumentTitle title="Homepage, video streaming">

      <BrowserRouter>
        <SkipLink links={links} className="skip-link" />
        <Context.Provider value={
          {
            id,
            profileEdit, setProfileEdit,
            createProfile, setCreateProfile,
            allUser, setAllUser,
            editHost, setEditHost,
            editHostID, setEditHostID,
            allHosts, setAllHosts,
            editInfoBar, setEditInfoBar,
            infoBarMessage, setInfoBarMessage,
            infoID, setInfoID,
            gapClass, setGapClass,
            pathName, setPathName,
            gradient, setGradient
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
              <Header />
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
              <Route exact path="/infobar" render={(props) => <EditInfoBar {...props} cookies={cookies} />} />
              <Route exact path="/contact" component={Contact} />

              {/* Archive Related */}
              <Route exact path="/archive" render={(props) => <ArchiveList {...props} cookies={cookies} />} />
              <Route exact path="/archive/:id" component={ArchiveDetail} />
              <Route exact path="/:id/edit" component={ArchiveEdit} />

              {/* Hosts Related */}
              <Route exact path="/hosts" render={(props) => <HostCarousel {...props} cookies={cookies} />} />
              <Route exact path="/hosts/all" render={(props) => <AllHosts {...props} cookies={cookies} />} />
              <Route exact path="/hosts/:id" render={(props) => <EditHostForm {...props} cookies={cookies} />} />

              {/* Blog Related */}
              <Route exact path="/blog" render={(props) => <Blog {...props} cookies={cookies} />} />

              {/* Schedule Related */}
              <Route exact path="/schedule" render={(props) => <Schedule {...props} cookies={cookies} />} />

              {/* Fallback to Error Page */}
              <Route component={Error} />

            </Switch>

            <footer id="footer" className={pathName !== "/" ? "gradient" : ""}>
              <div className="footer-img"></div>
            </footer>
          </div>
        </Context.Provider>
      </BrowserRouter>
    </DocumentTitle>

  );
}

export default App;
