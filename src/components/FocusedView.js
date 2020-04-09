import React from 'react';
import Header from "./Header";
import Tweet from "./Tweet";
import findPath from "../helpers/findPath";


import { selectTimeline } from "../reducers/timelineSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import _ from "lodash";
const FocusedView = (props) => {
  let { creatorHandle, id } = useParams();
  const timeline = useSelector(selectTimeline);
  console.log("THIS IS THE TIMELINE INSIDE OF FOCUSEDVIEW", timeline);
  console.log(id);
  let pathToTweet = findPath(id, timeline).split(".");
  pathToTweet.pop();
  console.log(pathToTweet);
  // console.log(_.get(timeline, pathToTweet));
  let tweetToFocus = _.get(timeline, pathToTweet);
  let parentTweet;
  let focusedTweetReplyChain;
  if (tweetToFocus.type === "child") {
    parentTweet = _.get(timeline, pathToTweet[0]);
    console.log("This is the parent tweet inside of FocusedView: ", parentTweet);
    console.log("TWEET TO FOCUS: ", tweetToFocus);
   
  }

  return (
    <div className="center-view">
      <Header title={"Tweet"} />
      {
      tweetToFocus.type === "child" ? (<Tweet id={id} tweet={parentTweet} childTweetToFocus={tweetToFocus}/>) :  <Tweet focusedView={true} id={id} tweet={tweetToFocus}/>
      }

      {
        // <Tweet focusedView={true} id={id} tweet={tweetToFocus}/>
      }
      
    </div>
  )
}

export default FocusedView;