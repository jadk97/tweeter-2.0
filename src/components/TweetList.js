import React from "react";
import Tweet from "./Tweet";

const TweetList = (props) => (
  props.timeline.map((tweet) => (
      <Tweet 
      key={tweet.id}
      id ={tweet.id} 
      creatorName={tweet.creatorName} 
      avatar={tweet.avatar}
      content={tweet.content} 
      posted_at={tweet.posted_at}
      creatorHandle={tweet.creatorHandle}
      />
  ))
)
export default TweetList;