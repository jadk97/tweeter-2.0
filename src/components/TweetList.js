import React from "react";
import Tweet from "./Tweet";




const TweetList = (props) => (

  props.timeline.map((tweet) => {
    console.log("THIS IS TWEET: ", tweet);
    console.log("This is the type of the TWEET: ",tweet.type)
    if(tweet.type==="parent"){
      return (
        
          <Tweet
            key={tweet.id}
            tweet={tweet}
          />


      )
    }
  }
  )
)
export default TweetList;