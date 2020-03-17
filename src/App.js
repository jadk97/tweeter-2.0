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
function App() {
const [timeline, handleTweetSubmit, userProfile] = useTweetInteract();

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/home">
            <div className="layout">
              <MainNavigation avatar ={userProfile.avatar}>
              <Home>
                <Header title={"Home"} />
                <ComposeTweet handleTweetSubmit={handleTweetSubmit} />
                {
                  timeline && <TweetList timeline={timeline} />
                }
              </Home>
              
              </MainNavigation>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
