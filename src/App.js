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

  const userProfile = {
    id: "12345",
    creatorName: "John Doe",
    avatar: "https://www.deccanherald.com/sites/dh/files/styles/article_detail/public/article_images/2017/04/04/604513.jpg?itok=FqqfYOfA",
    posted_at: Date.now(),
    creatorHandle: "@JohnDoe"
  }

  const [timeline, setTimeline] = useState();

  useEffect(() => {
    setTimeline(TWEETS);
  }, []);

  const handleTweetSubmit = (submittedTweet) => {
    let tweet = {
      ...userProfile,
      content: submittedTweet,
      replyCount: 0,
      retweets: 0,
      likes: 0
    };
    setTimeline((prev) => [tweet, ...prev])
  }
  return (
    <div className="App">
      <div className="layout">
        <NavBar />
        <Home>
          <Header title={"Home"} />
          <ComposeTweet handleTweetSubmit={handleTweetSubmit} />
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
