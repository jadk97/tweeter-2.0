import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import './App.css';
import Home from "./components/Home";
import MainNavigation from './components/MainNavigation';

// import { useTweetInteract } from "./hooks/tweet-interact-hook";

import Explore from './components/Explore';
import Notifications from "./components/Notifications";
import Messages from "./components/Messages";
import Bookmarks from "./components/Bookmarks";
import Profile from "./components/Profile";
import { selectUserProfile } from './reducers/userProfileSlice';
import FocusedView from "./components/FocusedView";
import InteractionView from "./components/InteractionView";
function App() {
  // const [timeline, handleTweetSubmit, userProfile] = useTweetInteract();
  const userProfile = useSelector(selectUserProfile);
  const dispatch = useDispatch();
  
  
  let routes;
  if(userProfile){
    routes = (
      <MainNavigation avatar={userProfile.avatar} creatorHandle={userProfile.creatorHandle}>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/explore">
        <Explore/>
        </Route>
        <Route path="/notifications">
        <Notifications />
        </Route>
        <Route path="/messages">
        <Messages/>
        </Route>
        <Route path="/bookmarks">
        <Bookmarks/>
        </Route>
        <Route path="/:creatorHandle/status/:id">
          <FocusedView />
        </Route>
        <Route path="/:creatorHandle">
          <Profile />
        </Route>
        <Route path="/interaction">
          <InteractionView />
        </Route>
      </Switch>
    </MainNavigation>
    )
  }
  return (
    <Router>
      <div className="App">
        <div className="layout">
         {routes}
        </div>
      </div>
    </Router>
  );
}

export default App;
