import React from "react";
import "./Tweet.css";
const Tweet = (props) => {
  return (
    <div className="tweet-container">
   

      <div className="tweet-content">
        <div className="tweet-avatar">
          <img className="avatar" src={props.avatar} />
        </div>
        <div className="tweet-text">
          <div className="creator-name">
            {props.creatorName}
            <span className="creator-handle"> {props.creatorHandle}</span>
            <span className="time-tweeted"> - {new Date(props.posted_at).toDateString()}</span>
          </div>
          <div>{props.content}</div>
        </div>

      </div>
      <p>{props.reply_count} {props.retweets} {props.likes}</p>
    </div>
  )
}

export default Tweet;