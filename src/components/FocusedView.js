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
  console.log("TWEET TO FOCUS: ", tweetToFocus);
  
  return(
    <div className="center-view">
      <Header title={"Tweet"} />
        <Tweet focusedView={true} id={id} tweet={tweetToFocus} />
    </div>
  )
}

export default FocusedView;