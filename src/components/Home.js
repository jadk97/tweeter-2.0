import React, { useState } from "react";
import "./Home.css";
import Header from "./Header";
import ComposeTweet from "./ComposeTweet";
import TweetList from "./TweetList";
import { useSelector } from "react-redux";
import { selectTimeline } from "../reducers/timelineSlice";
// import { useTweetInteract } from "../hooks/tweet-interact-hook";

const Home = (props) => {
  const timeline = useSelector(selectTimeline);
  console.log(timeline);
  return (
    <div className="center-view">
      <Header title={"Home"} />
      <ComposeTweet />
      <div className="divider"></div>
      {
        timeline && <TweetList timeline={timeline} />
      }
    </div>
  )
}

export default Home;