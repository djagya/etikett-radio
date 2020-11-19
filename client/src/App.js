import React, { useState } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Context } from './Context';
import { useMediaQuery } from 'react-responsive';
import io from 'socket.io-client';


import "./App.scss"


//Page General Related
import Home from './Home';
import Header from './header/Header';
import AboutUs from './AboutUs';
import Imprint from './Imprint';
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
import HostList from './hosts/HostList';
import HostDetails from './hosts/HostDetails';
import EditHostForm from './hosts/EditHostForm';
import AllHosts from './hosts/AllHosts';
//Archive Related
import ArchiveList from "./radio-archive/ArchiveList";
import ArchiveDetail from './radio-archive/ArchivedShowDetail';
import ArchiveInputForm from './radio-archive/ArchiveInputForm';
//Style related
import Noisy from './noise/Noisy'
import SolarSystem from './solar-system-logo/SolarSystem';
import DocumentTitle from 'react-document-title';
// import SkipLink from 'skip-links';
import GlobalErrorBoundary from './GlobalErrorBoundary';

//scroll to top
import ScrollMemory from 'react-router-scroll-memory';

const socket = io();


function App(props) {
  const [cookies, setCookie, removeCookie] = useCookies(['user', 'name']);
  /////for context/////
  let id = "";

  const [editHostID, setEditHostID] = useState("");
  const [allHosts, setAllHosts] = useState(false);
  const [infoBarMessage, setInfoBarMessage] = useState("");
  const [infoID, setInfoID] = useState("");
  const [name, setName] = useState('');
  const [gapClass, setGapClass] = useState("big-gap");
  const [pathName, setPathName] = useState("/")
  const [gradient, setGradient] = useState("gradient");
  const [showAbout, setShowAbout] = useState(false);
  const [onChat, setOnChat] = useState(true);
  const [chatHeight, setChatHeight] = useState(0);
  const [chatRef, setChatRef] = useState(0)


  // Media Queries
  const isMobileWidth = useMediaQuery({ maxWidth: 600 });
  const isMobileDevice = useMediaQuery({ maxDeviceWidth: 600 });

  if (cookies.user) {
    id = cookies.user._id
  }
  // const links = [
  //   { title: "Skip to main content", to: 'main' },
  //   { title: 'Skip to footer', to: 'footer' }
  // ]
  //////////////////////
  return (
    <DocumentTitle title="etikett~radio | homepage">

      <HashRouter>
        <ScrollMemory />
        {/* <SkipLink links={links} className="skip-link" /> */}
        <Context.Provider value={
          {
            id,
            editHostID, setEditHostID,
            allHosts, setAllHosts,
            infoBarMessage, setInfoBarMessage,
            infoID, setInfoID,
            gapClass, setGapClass,
            pathName, setPathName,
            gradient, setGradient,
            showAbout, setShowAbout,
            onChat, setOnChat,
            chatHeight, setChatHeight,
            chatRef, setChatRef,
            socket
          }
        }>
          <div className="App">
            <GlobalErrorBoundary>

              <div className="noise" >
                <Noisy />
              </div>

              <div className="solar-system">
                <SolarSystem />
              </div>


              <div className="stream-page">
                <Header name={name} setName={setName} isMobileWidth={isMobileWidth} isMobileDevice={isMobileDevice} />
                <div className="header-background">
                {/* For monitors wider than 1920px */}
                </div>
              </div>

              <Switch>

                {/*Placeholder for / route so we don't land on Error component*/}
                <Route exact path="/">
                  {isMobileDevice ? <Redirect to="/schedule" /> : <Home />}
                </Route>
                {/* About Us */}
                <Route exact path="/about" render={(props) => <AboutUs {...props} cookies={cookies}/>} />
                {/* About Us */}
                <Route exact path="/imprint" render={(props) => <Imprint {...props} cookies={cookies}/>} />
                
                {/* Staff Only Routes */}
                <Route exact path="/login" render={(props) => <LogIn {...props} setCookie={setCookie} cookies={cookies} setName={setName} removeCookie={removeCookie} />} />
                <Route exact path="/user/all" render={(props) => <AllUser {...props} cookies={cookies} />} />
                <Route exact path="/user/createuser" render={(props) => <CreateUser {...props} setCookie={setCookie} cookies={cookies} />} />
                <Route exact path="/user/:id" render={(props) => <StaffOnly {...props} removeCookie={removeCookie} cookies={cookies} setName={setName} />} />
                <Route exact path="/user/:id/edit" render={(props) => <EditMyProfile cookies={cookies} setCookie={setCookie} />} />
                <Route exact path="/user/shows/all" render={(props) => <AllHosts {...props} cookies={cookies} />} />
                <Route exact path="/user/show/:id" render={(props) => <EditHostForm {...props} cookies={cookies} />} />
                <Route exact path="/infobar" render={(props) => <EditInfoBar {...props} cookies={cookies} />} />
                <Route exact path="/contact" component={Contact} />

                {/* Archive Routes */}
                <Route exact path="/archive" render={(props) => <ArchiveList {...props} cookies={cookies} />} />
                <Route exact path="/archive/:id" render={(props) => <ArchiveDetail {...props} cookies={cookies} />} />
                <Route exact path="/:id/edit" component={ArchiveInputForm} />

                {/* Hosts Routes */}
                <Route exact path="/shows" render={(props) => <HostList {...props} cookies={cookies} />} />
                <Route exact path="/shows/:id" render={(props) => <HostDetails {...props} cookies={cookies} />} />

                {/* Blog Routes */}
                <Route exact path="/blog" render={(props) => <Blog {...props} cookies={cookies} />} />

                {/* Schedule Routes */}
                <Route exact path="/schedule" render={(props) => <Schedule {...props} cookies={cookies} />} />

                {/* Fallback to Error Page */}
                <Route component={Error} />

              </Switch>

              <footer id="footer" className={pathName !== "/" ? "gradient" : ""}>
                <div className="footer-img"></div>
              </footer>

            </GlobalErrorBoundary>
          </div>
        </Context.Provider>
      </HashRouter>
    </DocumentTitle>

  );
}

export default App;