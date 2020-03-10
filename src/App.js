import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from "./components/Home";
import TweetList from "./components/TweetList";
import NavBar from "./components/NavBar";
function App() {
  return (
    <div className="App">
    <NavBar/>
    <Home>
    <TweetList />
    </Home>
    </div>
  );
}

export default App;
