import React from "react";
import Tweet from "./Tweet";
const TWEETS = [
  {
    id: 1,
    content: "What tweeterific tweet",
    posted_at: Date.now(),
    creatorName: "Ayn Rand",
    creatorHandle: "@AtlasShrugged",
    replyCount: 345,
    retweets: 500,
    likes: 120
  }
]
const TweetList = (props) => (
  TWEETS.map((tweet) => (
      <Tweet 
      id ={tweet.id} 
      creatorName={tweet.creatorName} 
      content={tweet.content} 
      posted_at={tweet.posted_at}
      creatorHandle={tweet.creatorHandle}
      />
  ))
)
export default TweetList;