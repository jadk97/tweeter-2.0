import React from "react";
import Tweet from "./Tweet";




const TweetList = (props) => (

  props.timeline.map((tweet) => { 
    
    // if(tweet.type==="parent"){
      if(tweet.type === "child"){
        return (
          <Tweet
          key={tweet.id}
          tweet={tweet}
          showMentions={true}
        />
        )
      }
      else{
        return (
          
            <Tweet
              key={tweet.id}
              tweet={tweet}
            />
  
  
        )
      }
    // }
  }
  )
)
export default TweetList;