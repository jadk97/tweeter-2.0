import React from 'react';
import Header from "./Header";
import Tweet from "./Tweet";
import findPath from "../helpers/findPath";


import { selectTimeline } from "../reducers/timelineSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import _ from "lodash";

// refactor this later
const FocusedView = (props) => {
  let { creatorHandle, id } = useParams();
  const timeline = useSelector(selectTimeline);

  
  let pathToTweet = findPath(id, timeline).split(".");

  pathToTweet.pop();

  let tweetToFocus = _.get(timeline, pathToTweet);
 
  let pathToChildTweet;
  let replyChainToRender;
 
  let individualTweets = [];
  let pathCopy = [];
  for(let dir of pathToTweet){
    pathCopy.push(dir);
    if(_.get(timeline, pathCopy).constructor.name == "Object"){
      individualTweets.push(_.get(timeline, pathCopy));
    }
  }
  
  replyChainToRender  = individualTweets.reduceRight(function (a, c) {
      return {
        ...c,
        replies: [a]
      }; 
    });

  return (
    <div className="center-view">
      <Header title={"Tweet"} navButton={true}/>
      {
      tweetToFocus.type === "child" ? (<Tweet id={id} tweet={replyChainToRender} childTweetToFocus={tweetToFocus}/>) :  <Tweet focusedView={true} id={id} tweet={tweetToFocus}/>
      }

      {
        // <Tweet focusedView={true} id={id} tweet={tweetToFocus}/>
      }
      
    </div>
  )
}

export default FocusedView;