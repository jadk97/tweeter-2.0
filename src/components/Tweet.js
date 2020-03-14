import React from "react";
import "./Tweet.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faRetweet, faCircle } from "@fortawesome/free-solid-svg-icons";
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
        <span className="fa-layers like-button" >
          <FontAwesomeIcon
            icon={faComment}
            size="lg"
            color="#778899"
            className="like-icon"
          />
          <FontAwesomeIcon
            icon={faCircle}
            size="3x"
            color="rgba(29, 161, 242, 0.1)"
            className="like-circle-icon"
            transform="left-4.5"
          />
        </span>

        <span className="fa-layers retweet-button">
          <FontAwesomeIcon
            icon={faRetweet}
            size="lg"
            color="#778899"
            className="retweet-icon"
          />
          <FontAwesomeIcon
            icon={faCircle}
            size="3x"
            color="rgba(23, 191, 99, 0.1)"
            className="retweet-circle-icon"
            transform="left-3.5"
          />
        </span>

        <span className="fa-layers heart-button">
        <FontAwesomeIcon
          icon={faHeart}
          size="lg"
          color="#778899"
          className="heart-icon"
        />
        <FontAwesomeIcon
        icon={faCircle}
        size="3x"
        color="rgb(224, 36, 94, 0.1)"
        className="heart-circle-icon"
        transform="left-4.2"
      />
        </span>

        <span className="fa-layers bookmark-button">
          <FontAwesomeIcon
            icon={faBookmark}
            size="lg"
            color="#778899"
            className="bookmark-icon"
          />
          <FontAwesomeIcon
            icon={faCircle}
            size="3x"
            color="rgba(29, 161, 242, 0.1)"
            className="bookmark-circle-icon"
            transform="left-5.4"
          />
        </span>
      </div>

      <p>{props.reply_count} {props.retweets} {props.likes}</p>
    </div>
  )
}

export default Tweet;