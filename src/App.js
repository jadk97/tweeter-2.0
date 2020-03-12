import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from "./components/Home";
import TweetList from "./components/TweetList";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import ComposeTweet from "./components/ComposeTweet";
import Header from "./components/Header";
function App() {
  return (
    <div className="App">
      <div className="layout">
        <NavBar />
        <Home>
        <Header title={"Home"} />
          <ComposeTweet/>
          <TweetList />
        </Home>
        <SideBar />
      </div>
    </div>
  );
}

export default App;
