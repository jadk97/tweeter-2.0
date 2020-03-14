import React from "react";
import "./Tweet.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
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
      <div className="tweet-interaction-icons">
        <FontAwesomeIcon
          icon={faComment}
          size="lg"
          color="#778899"
        />
        <FontAwesomeIcon
          icon={faRetweet}
          size="lg"
          color="#778899"
        />
        <FontAwesomeIcon
          icon={faHeart}
          size="lg"
          color="#778899"
        />
        <FontAwesomeIcon
        icon={faBookmark}
        size="lg"
        color="#778899"
      />
      </div>

      <p>{props.reply_count} {props.retweets} {props.likes}</p>
    </div>
  )
}

export default Tweet;