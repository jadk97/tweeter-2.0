import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from "./components/Home";
import TweetList from "./components/TweetList";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
function App() {
  return (
    <div className="App">
    <div className="layout">
    <NavBar/>
    <Home>
    <TweetList />
    </Home>
    <SideBar/>
    </div>
    </div>
  );
}

export default App;
