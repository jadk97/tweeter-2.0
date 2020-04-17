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
  // console.log("This is the path to tweet inside FocusedView", pathToTweet);
  pathToTweet.pop();
  console.log("This is the path to tweet inside FocusedView", pathToTweet);
  // console.log(_.get(timeline, pathToTweet));
  let tweetToFocus = _.get(timeline, pathToTweet);
  let parentTweet;
  let pathToChildTweet;
  let replyChainToRender;
  if (tweetToFocus.type === "child") {
    console.log("tweet is a child");
    console.log("The last index of tweetToFocus: ", tweetToFocus.replyingTo[tweetToFocus.replyingTo.length - 1]);
    pathToChildTweet = findPath(tweetToFocus.replyingTo[tweetToFocus.replyingTo.length - 1], timeline).split(".");
    pathToChildTweet.pop();
    parentTweet = _.get(timeline, pathToChildTweet);

    let rootParentTweet = _.get(timeline, pathToTweet[0]);
    console.log("This is the rootParentTweet:", rootParentTweet)
    console.log("This is the parent tweet inside of FocusedView: ", parentTweet);
    console.log("TWEET TO FOCUS: ", tweetToFocus);
    let tweetIndex = parentTweet.replies.findIndex((tweet) => tweet.id === tweetToFocus.id);
    console.log("this is the index of the child tweet", tweetIndex);
    if(tweetIndex > 0) {
      console.log("This is the replies of parent tweet inside of Focusedview:", parentTweet.replies);
      // let tweetChecker = parentTweet;
      console.log("This is the root parent tweet: ", rootParentTweet);
      console.log("UNGA");
      // replyChainToRender = {...parentTweet, replies: [tweetToFocus] }
      parentTweet.id === rootParentTweet.id ? (replyChainToRender =  {...parentTweet, replies: [tweetToFocus]})
       : (replyChainToRender = {...rootParentTweet, replies: [{ ...parentTweet, replies: [tweetToFocus]}]})
    }
    else {
      parentTweet.id === rootParentTweet.id ? (replyChainToRender =  {...parentTweet, replies: [tweetToFocus]})
       : (replyChainToRender = {...rootParentTweet, replies: [{ ...parentTweet, replies: [tweetToFocus]}]})
      // replyChainToRender = parentTweet;
    }
    // console.log("TWEET TO FOCUS replyCount: ",   tweetToFocus.replies.length)
  }

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