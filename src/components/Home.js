import React, { useEffect } from "react";
import "./Home.css";
import Header from "./Header";
import ComposeTweet from "./ComposeTweet";
import TweetList from "./TweetList";
import { useTweetInteract } from "../hooks/tweet-interact-hook";

const Home = (props) => {
  const [timeline, handleTweetSubmit, userProfile] = useTweetInteract();
  
  useEffect(() => {

  }, [timeline]);
  return (
    <div className="center-view">
      <Header title={"Home"} />
      <ComposeTweet handleTweetSubmit={handleTweetSubmit}/>
      {
        timeline && <TweetList timeline={timeline} />
      }
    </div>
  )
}

export default Home;