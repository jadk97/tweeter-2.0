import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Home from "./components/Home";
import TweetList from "./components/TweetList";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import ComposeTweet from "./components/ComposeTweet";
import Header from "./components/Header";
import MainNavigation from './components/MainNavigation';

import { useTweetInteract } from "./hooks/tweet-interact-hook";
import Explore from './components/Explore';
import Notifications from "./components/Notifications";
import Messages from "./components/Messages";
import Bookmarks from "./components/Bookmarks";
function App() {
  const [timeline, handleTweetSubmit, userProfile] = useTweetInteract();

  return (
    <Router>
      <div className="App">
        <div className="layout">
          <MainNavigation avatar={userProfile.avatar}>
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
            </Switch>
          </MainNavigation>
        </div>
      </div>
    </Router>
  );
}

export default App;
