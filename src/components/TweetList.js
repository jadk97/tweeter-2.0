import React from "react";
import Tweet from "./Tweet";
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
]
const TweetList = (props) => (
  TWEETS.map((tweet) => (
      <Tweet 
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