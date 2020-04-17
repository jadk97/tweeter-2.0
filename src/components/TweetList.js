import React from "react";
import Tweet from "./Tweet";




const TweetList = (props) => (

  props.timeline.map((tweet) => { 
    
    // if(tweet.type==="parent"){
      return (
        
          <Tweet
            key={tweet.id}
            tweet={tweet}
          />


      )
    // }
  }
  )
)
export default TweetList;