import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./Home.css";
import Header from "./Header";
import ComposeTweet from "./ComposeTweet";
import TweetList from "./TweetList";
import { selectTimeline } from "../reducers/timelineSlice";
// import { useTweetInteract } from "../hooks/tweet-interact-hook";

const Home = (props) => {
  const timeline = useSelector(selectTimeline);
 
  return (
    <div className="center-view">
      <Header title={"Home"} />
      <ComposeTweet />
      {
        timeline && <TweetList timeline={timeline} />
      }
    </div>
  )
}

export default Home;