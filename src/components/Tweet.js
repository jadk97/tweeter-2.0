import React, { useState } from "react";
import "./Tweet.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faRetweet, faCircle } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import Button from "./Button";
import ComposeTweet from "./ComposeTweet";
const Tweet = (props) => {
  const [heartClicked, setHeartClicked] = useState(false);
  const [retweetClicked, setRetweetClicked] = useState(false);
  const [replyClicked, setReplyClicked] = useState(false);
  const clickHandler = (e) => {
    e.stopPropagation();

    let clickedElement = e.currentTarget.classList;
    if (clickedElement[1] === "heart-button") {
      setHeartClicked((prev) => !prev);
    }

    if (clickedElement[1] === "retweet-button") {
      setRetweetClicked((prev) => !prev);
    }

    if (clickedElement[1] === "reply-button") {
      setReplyClicked((prev) => !prev);
    }
  }

  return (
    <div className="tweet-container" onClick={(event) => clickHandler(event)}>
      <Modal
        show={replyClicked}
        onCancel={() => setReplyClicked(setReplyClicked((prev) => !prev))}
        header={"tweet"}
        contentClass="tweet__modal-content"
        footerClass="tweet__modal-actions"
        footer={<ComposeTweet type="reply" replyingTo={props.id}></ComposeTweet>}
      >
        <div className="tweet-content">
          <div className="tweet-avatar">
            <img className="avatar" src={props.avatar} />
            <div className="reply-line"></div>
          </div>
          <div className="tweet-text">
            <div className="creator-name">
              {props.creatorName} 
              <span className="creator-handle"> {props.creatorHandle}</span>
              <span className="time-tweeted"> - {new Date(props.posted_at).toDateString()}</span>
            </div>
            <div>{props.content}</div>
            <div className="replying-to">Replying to <span>{props.creatorHandle}</span></div>
          </div>
          
        </div>
      </Modal>
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
        <span className="fa-layers reply-button" onClick={clickHandler} >
          <FontAwesomeIcon
            icon={faComment}
            size="lg"
            color="#778899"
            className="reply-icon"
          />
          <FontAwesomeIcon
            icon={faCircle}
            size="3x"
            color="rgba(29, 161, 242, 0.1)"
            className="reply-circle-icon"
            transform="left-4.5"
          />
          <span className="reply-counter">{props.replyCount}</span>
        </span>

        <span className={`fa-layers retweet-button ${retweetClicked ? "__clicked" : ""}`} onClick={clickHandler}>
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
          <span className="retweet-counter">{props.retweets}</span>
        </span>

        <span className={`fa-layers heart-button ${heartClicked ? "__clicked" : ""}`} onClick={clickHandler}>
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
          <span className="like-counter">{props.likes}</span>
        </span>

        <span className="fa-layers bookmark-button" onClick={clickHandler}>
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
    </div>
  )
}

export default Tweet;