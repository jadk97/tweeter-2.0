import React from "react";

const Tweet = (props) => {
  return (
    <div>
    <h2>{props.creatorName} {props.creatorHandle}</h2>
    <p>{props.content}</p>
    <p>{props.reply_count} {props.retweets} {props.likes}</p>
    <p>{new Date(props.posted_at).toDateString()}</p>
    </div>
  )
}

export default Tweet;