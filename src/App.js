import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from "./components/Home";
import TweetList from "./components/TweetList";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import ComposeTweet from "./components/ComposeTweet";
import Header from "./components/Header";
function App() {
  const TWEETS = [
    {
      id: 1,
      content: "What tweeterific tweet",
      posted_at: Date.now(),
      creatorName: "Ayn Rand",
      creatorHandle: "@AtlasShrugged",
      avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Ayn_Rand_by_Talbot_1943.jpg/220px-Ayn_Rand_by_Talbot_1943.jpg",
      replyCount: 345,
      retweets: 500,
      likes: 120
    }
  ];

  const [timeline, setTimeline] = useState();

  useEffect(() => {
    setTimeline(TWEETS);
  }, [timeline]);

  return (
    <div className="App">
      <div className="layout">
        <NavBar />
        <Home>
          <Header title={"Home"} />
          <ComposeTweet />
          {
            timeline && <TweetList timeline={timeline} />
          }
        </Home>
        <SideBar />
      </div>
    </div>
  );
}

export default App;
